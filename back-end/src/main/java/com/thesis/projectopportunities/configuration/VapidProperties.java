package com.thesis.projectopportunities.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.vapid")
public record VapidProperties(

	String publicKey,

	String privateKey
) {

}
