package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.model.Resume;
import com.thesis.projectopportunities.repo.ResumeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResumeService {
	private final ResumeRepo resumeRepo;


	public void addResume(String userName, String fileName) {
		Resume resume = new Resume();

		resume.setResumeName(fileName);
		resume.setUsername(userName);

		resumeRepo.save(resume);
	}
}
