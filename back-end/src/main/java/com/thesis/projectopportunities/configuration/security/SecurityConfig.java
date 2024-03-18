package com.thesis.projectopportunities.configuration.security;


import java.util.Arrays;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthConverter jwtAuthConverter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(request -> {
				CorsConfiguration configuration = new CorsConfiguration();
				configuration.setAllowedOriginPatterns(List.of("http://localhost:[*]/"));
				configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PATCH"));
				configuration.setAllowedHeaders(List.of("*"));
				return configuration;
			})).csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(
				authorize -> authorize.requestMatchers(HttpMethod.POST, "/companies").hasRole("ADMIN_CLIENT")
					.requestMatchers(HttpMethod.POST, "/positions").hasRole("ADMIN_CLIENT").anyRequest().authenticated())
			.oauth2ResourceServer(o -> o.jwt(jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwtAuthConverter)));
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


}
