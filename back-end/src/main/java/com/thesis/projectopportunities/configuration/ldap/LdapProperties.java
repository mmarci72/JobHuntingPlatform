package com.thesis.projectopportunities.configuration.ldap;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "ldap")
public record LdapProperties(String url, String base) {

}
