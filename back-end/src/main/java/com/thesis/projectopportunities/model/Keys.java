package com.thesis.projectopportunities.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class Keys implements Serializable {

	private String auth;

	private String p256dh;
}
