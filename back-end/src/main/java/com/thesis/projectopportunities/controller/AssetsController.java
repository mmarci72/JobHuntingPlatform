package com.thesis.projectopportunities.controller;


import com.thesis.projectopportunities.service.AssetService;
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

	@GetMapping("/assets/company-logo/{logoName}")
	public ResponseEntity<byte[]> getCompanyLogo(@PathVariable String logoName) throws IOException {
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

	@PostMapping("/assets/company-logo")
	public ResponseEntity<String> postCompanyLogo(@RequestBody byte[] file, @RequestParam Long companyId) {

		if (this.assetService.writeCompanyLogo(file, companyId)) {
			return ResponseEntity.ok("Company logo saved successfully");
		}

		return ResponseEntity.internalServerError().body("Error saving company logo");
	}

	@PostMapping("/assets/company-logo/replace")
	public ResponseEntity<String> replaceCompanyLogo(@RequestBody byte[] file, @RequestParam Long companyId) throws IOException {

		if (this.assetService.replaceCompanyLogo(file, companyId)) {
			return ResponseEntity.ok("Company logo saved successfully");
		}

		return ResponseEntity.internalServerError().body("Error saving company logo");
	}

	@GetMapping("/assets/resume/{userName}")
	public ResponseEntity<byte[]> getResume(@PathVariable String userName) throws IOException {
		byte[] resume;
		try {
			resume = assetService.getResumeAsByte(userName);
		} catch (IllegalArgumentException e) {
			throw new ResourceNotFoundException();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		return new ResponseEntity<>(resume, headers, HttpStatus.OK);
	}

	@GetMapping("/assets/resume/exists/{userName}")
	public ResponseEntity<Boolean> doesResumeExist(@PathVariable String userName) {
		return ResponseEntity.ok(assetService.doesResumeExist(userName));
	}


	@PostMapping("/assets/resume")
	public ResponseEntity<String> postResume(@RequestParam String userName,
											 @RequestBody byte[] file) {

		var fileName = userName + ".pdf";
		if (this.assetService.writeResume(file, fileName)) {
			return ResponseEntity.ok("Resume saved successfully");
		}

		return ResponseEntity.internalServerError().body("Error saving the resume");
	}

	@DeleteMapping("/assets/resume/{userName}")
	public void deleteResume(@PathVariable String userName) {
		var fileName = userName + ".pdf";
		this.assetService.deleteResume(fileName);

	}
}
