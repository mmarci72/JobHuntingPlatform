package com.thesis.projectopportunities.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AlreadyExistingCommentException extends RuntimeException {

	public AlreadyExistingCommentException(String message) {
		super(message);
	}
}
