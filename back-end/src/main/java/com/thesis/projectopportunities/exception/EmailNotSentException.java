package com.thesis.projectopportunities.exception;


public class EmailNotSentException extends RuntimeException {

	public EmailNotSentException(String message, Throwable cause) {
		super(message, cause);
	}
}
