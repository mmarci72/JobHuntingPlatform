package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.model.Subscription;
import com.thesis.projectopportunities.repo.SubscriptionRepo;
import com.thesis.projectopportunities.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class SubscriptionController {

	private final SubscriptionRepo subscriptionRepo;

	private final SubscriptionService subscriptionService;

	@PostMapping("/subscriptions")
	public ResponseEntity<String> addSubscription(@RequestBody Subscription subscription) {
		subscriptionService.addNewSubscription(subscription);
		return ResponseEntity.ok("Subscription added");
	}

	@DeleteMapping("/subscriptions/{userId}")
	public void deleteSubscription(@PathVariable String userId) {
		subscriptionRepo.deleteById(userId);
	}
}

