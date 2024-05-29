package com.thesis.projectopportunities;

import java.time.Instant;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import com.thesis.projectopportunities.configuration.keycloak.KeycloakConfiguration;
import com.thesis.projectopportunities.service.EmailService;
import com.thesis.projectopportunities.service.KeycloakService;
import com.thesis.projectopportunities.service.SubscriptionService;
import io.restassured.RestAssured;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.Setter;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application.properties")
public abstract class BaseSystemTest {

	@Value("${local.server.port}")
	protected String port;

	@MockBean
	protected KeycloakConfiguration keycloakConfiguration;

	@MockBean
	protected KeycloakService keycloakService;

	@MockBean
	protected EmailService emailService;

	@MockBean
	protected SubscriptionService messageService;

	@MockBean
	protected JwtDecoder jwtDecoder;

	@Setter(onMethod_ = @Autowired)
	protected Flyway flyway;

	@BeforeEach
	protected void setup() {
		RestAssured.port = Integer.parseInt(port);
		flyway.clean();
		flyway.migrate();
	}

	@Configuration
	public static class TestSecurityConfiguration {

		private static final TestPrincipal PUBLIC_PRINCIPAL = new TestPrincipal("public", "public", false);

		private static final TestPrincipal ADMIN_PRINCIPAL = new TestPrincipal("admin", "admin", true);


		private final AnonymousAuthenticationFilter filter = new AnonymousAuthenticationFilter("dummy") {
			@Override
			protected Authentication createAuthentication(HttpServletRequest request) {
				String role = request.getHeader("role");

				OAuth2AuthenticatedPrincipal principal;

				if ("ROLE_RECRUITER_CLIENT".equals(role)) {
					principal = ADMIN_PRINCIPAL;
				} else {
					principal = PUBLIC_PRINCIPAL;
				}
				OAuth2AccessToken accessToken = new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER,
					"asdf", Instant.now(), Instant.MAX);
				return new BearerTokenAuthentication(principal, accessToken, principal.getAuthorities());
			}
		};

		@Bean("loginConfigurer")
		public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
			return http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable)
				.anonymous(it -> it.authenticationFilter(filter))
				.authorizeHttpRequests(
					auth -> auth.requestMatchers(HttpMethod.POST, "/companies").hasAuthority("ROLE_RECRUITER_CLIENT")
						.requestMatchers(HttpMethod.POST, "/positions").hasAuthority("ROLE_RECRUITER_CLIENT").anyRequest()
						.permitAll()).build();
		}


		@Getter
		private static class TestPrincipal implements OAuth2AuthenticatedPrincipal {

			private final String username;

			private final String userId;

			private final Map<String, Object> attributes;

			private final Collection<SimpleGrantedAuthority> authorities;

			public TestPrincipal(String username, String userId, boolean isAdmin) {
				this.username = username;
				this.userId = userId;
				HashMap<String, Object> attributes = new HashMap<>();
				attributes.put("sub", username);
				if (userId != null) {
					attributes.put("uid", userId);
				}
				if (isAdmin) {
					this.authorities = new HashSet<>();
					this.authorities.add(new SimpleGrantedAuthority("ROLE_RECRUITER_CLIENT"));
				} else {
					this.authorities = new HashSet<>();
				}
				this.attributes = Collections.unmodifiableMap(attributes);
			}

			@Override
			public String getName() {
				return username;
			}

			@Override
			public String toString() {
				return username;
			}

		}
	}

}
