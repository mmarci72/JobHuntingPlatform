package com.thesis.projectopportunities.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
public class AssetService {

	@Value("${assets.path}")
	private String assetsFolder;

	private static final String COMPANY_LOGOS_FOLDER_NAME = "companyLogos/";

	private static final String RESUME_FOLDER_NAME = "resume/";

	public byte[] getCompanyLogoAsByte(String fileName) throws IOException {
		String path = COMPANY_LOGOS_FOLDER_NAME + fileName;

		return getImageAsByte(path);
	}

	public boolean writeCompanyLogo(byte[] file) {
		String fileName = UUID.randomUUID().toString();
		String path = COMPANY_LOGOS_FOLDER_NAME + fileName + ".jpg";


		return this.saveFile(file, path);
	}

	public byte[] getResumeAsByte(String userName) throws IOException {
		return getImageAsByte(getResumeFileNameFromUserName(userName));
	}

	public boolean doesResumeExist(String userName) {
		String path = assetsFolder + RESUME_FOLDER_NAME + getResumeFileNameFromUserName(userName);
		return Files.exists(Paths.get(path));
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
		String path = RESUME_FOLDER_NAME + fileName;


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
