package com.thesis.projectopportunities.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class PushSubscription implements Serializable {

	private String endpoint;

	private int expirationTime;

	private Keys keys;
}
