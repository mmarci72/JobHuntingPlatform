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

	private final String companyLogosFolderName = "companyLogos/";

	private final String resumeFolderName = "resume/";

	public byte[] getCompanyLogoAsByte(String fileName) throws IOException {
		String path = companyLogosFolderName + fileName;

		return getImageAsByte(path);
	}

	public byte[] getResumeAsByte(String userName) throws IOException {
		return getImageAsByte(getResumeFileNameFromUserName(userName));
	}

	private String getResumeFileNameFromUserName(String userName) {
		return userName + ".pdf";
	}

	private byte[] getImageAsByte(String path) throws IOException {
		String fullPath = assetsFolder + path;

		try {
			Path imagePath = Paths.get(fullPath);
			return Files.readAllBytes(imagePath);
		} catch (InvalidPathException e) {
			throw new IllegalArgumentException("Path does not exist", e);
		}

	}

	public boolean writeResume(byte[] file, String fileName) {
		String path = resumeFolderName + fileName;


		return this.saveFile(file, path);
	}

	private boolean saveFile(byte[] file, String path) {
		String fullPath = assetsFolder + path;
		Path imagePath = Paths.get(fullPath);

		try {
			Files.write(imagePath, file);
		} catch (IOException e) {
			return false;
		}

		return true;
	}
}
