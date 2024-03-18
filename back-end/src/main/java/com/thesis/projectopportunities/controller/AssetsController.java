package com.thesis.projectopportunities.controller;


import com.thesis.projectopportunities.service.AssetService;
import com.thesis.projectopportunities.service.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
@Slf4j
public class AssetsController {
	private final AssetService assetService;

	private final ResumeService resumeService;

	@GetMapping("/assets/company-logo/{logoName}")
	public ResponseEntity<byte[]> getProject(@PathVariable String logoName) throws IOException {
		byte[] image;
		try {
			image = assetService.getCompanyLogoAsByte(logoName);
		} catch (IllegalArgumentException e) {
			throw new ResourceNotFoundException();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		return new ResponseEntity<>(image, headers, HttpStatus.OK);
	}


	@PostMapping("/assets/resume")
	public ResponseEntity<String> postResume(@RequestParam String userName,
											 @RequestBody byte[] file) {

		var fileName = userName + ".pdf";
		if (this.assetService.writeResume(file, fileName)) {
			this.resumeService.addResume(userName, fileName);
			return ResponseEntity.ok("Resume saved successfully");
		}

		return ResponseEntity.internalServerError().body("Error saving the resume");
	}
}
