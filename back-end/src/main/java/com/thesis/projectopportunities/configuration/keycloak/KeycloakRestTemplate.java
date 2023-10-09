package com.thesis.projectopportunities.configuration.keycloak;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakRestTemplate {


	@Bean
	public org.springframework.web.client.RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilderHandler) {
		return restTemplateBuilderHandler.build();
	}
}
