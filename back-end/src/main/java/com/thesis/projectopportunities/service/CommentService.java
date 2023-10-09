package com.thesis.projectopportunities.service;

import java.util.Optional;

import com.thesis.projectopportunities.model.Comment;
import com.thesis.projectopportunities.repo.CommentRepo;
import com.thesis.projectopportunities.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepo commentRepo;

	private final UserRepo userRepo;

	public Optional<Comment> save(Comment comment) {
		comment.setFullName(userRepo.findByUsername(comment.getUsername()).getFullName());
		return Optional.of(commentRepo.save(comment));
	}
}
