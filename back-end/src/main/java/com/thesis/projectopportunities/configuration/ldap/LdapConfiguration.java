package com.thesis.projectopportunities.configuration.ldap;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.ldap.repository.config.EnableLdapRepositories;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

//TODO: FIX BASE PACKAGE
@Configuration
@EnableLdapRepositories(basePackages = "")
@EnableConfigurationProperties(LdapProperties.class)
public class LdapConfiguration {


	@Bean
	public LdapContextSource contextSource(LdapProperties env) {
		LdapContextSource contextSource = new LdapContextSource();
		contextSource.setUrl(env.url());
		contextSource.setBase(env.base());
		return contextSource;
	}

	@Bean(name = "ldapTemplate")
	public LdapTemplate ldapTemplate(@Qualifier("contextSource") LdapContextSource contextSource) {
		return new LdapTemplate(contextSource);
	}
}
