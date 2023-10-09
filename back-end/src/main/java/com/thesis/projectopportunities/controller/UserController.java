package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.model.User;
import com.thesis.projectopportunities.repo.UserRepo;
import com.thesis.projectopportunities.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class UserController {

	private final UserRepo userRepo;

	private final UserService userService;

	@GetMapping(value = "user/{userName}")
	public @ResponseBody User findUserByUsername(@PathVariable String userName) {
		return userRepo.findByUsername(userName);
	}

	@PostMapping(value = "user")
	public ResponseEntity<Boolean> assignAdminIfCareerCoach(@RequestBody User user) {
		return ResponseEntity.ok(userService.assignAdminIfCareerCoach(user));
	}
}
