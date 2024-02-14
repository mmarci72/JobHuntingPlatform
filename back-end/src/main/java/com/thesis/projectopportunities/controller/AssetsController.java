package com.thesis.projectopportunities.controller;


import com.thesis.projectopportunities.service.AssetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
@Slf4j
public class AssetsController {
	private final AssetService assetService;

	@GetMapping("/assets/company-logo/{logoName}")
	public ResponseEntity<byte[]> getProject(@PathVariable String logoName) throws IOException {
		byte[] image;
		try {
			image = assetService.getCompanyLogoAsByte(logoName);
		} catch(IllegalArgumentException e) {
			throw new ResourceNotFoundException();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		return new ResponseEntity<>(image, headers, HttpStatus.OK);
	}

}
