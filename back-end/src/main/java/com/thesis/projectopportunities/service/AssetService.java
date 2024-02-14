package com.thesis.projectopportunities.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class AssetService {

	@Value("${assets.path}")
	private String assetsFolder;

	public byte[] getCompanyLogoAsByte(String fileName) throws IOException {
		String path = "companyLogos/" + fileName;

		return getImageAsByte(path);
	}

	private byte[] getImageAsByte(String path) throws IOException {
		String fullPath = assetsFolder + path;

		try {
			Path imagePath = Paths.get(fullPath);
			return Files.readAllBytes(imagePath);
		} catch(InvalidPathException e) {
			throw new IllegalArgumentException("Path does not exist", e);
		}

	}
}
