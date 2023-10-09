package com.thesis.projectopportunities.controller;

import java.util.Set;
import java.util.stream.Collectors;

import com.thesis.projectopportunities.dto.CommentDto;
import com.thesis.projectopportunities.mapping.CommentMapper;
import com.thesis.projectopportunities.repo.CommentRepo;
import com.thesis.projectopportunities.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class CommentController {

	private final CommentRepo commentRepo;

	private final CommentService commentService;

	private final CommentMapper commentMapper;

	@GetMapping("/positions/{positionId}/comments")
	public ResponseEntity<Set<CommentDto>> getCommentsForPosition(@PathVariable int positionId) {
		return ResponseEntity.ok(
			commentRepo.findAllByPositionPositionId((positionId)).stream().map(commentMapper::toComment)
				.collect(Collectors.toSet()));
	}

	@GetMapping("/comments/{commentId}")
	public CommentDto getCommentById(@PathVariable long commentId) {
		return commentMapper.toComment(commentRepo.findById(commentId)
			.orElseThrow(() -> new ResourceNotFoundException("The requested comment could not be found!")));
	}


	@PostMapping("/comments")
	public CommentDto postNewComment(@RequestBody CommentDto comment) {
		return commentMapper.toComment(commentService.save(commentMapper.toComment(comment)).orElse(null));
	}

	@GetMapping("/comments")
	public Set<CommentDto> getAllComments() {
		return commentRepo.findAll().stream().map(commentMapper::toComment).collect(Collectors.toSet());

	}
}
