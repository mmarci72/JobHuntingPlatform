package com.thesis.projectopportunities.controller;


import java.util.Set;
import java.util.stream.Collectors;

import com.thesis.projectopportunities.dto.ProjectDto;
import com.thesis.projectopportunities.mapping.ProjectMapper;
import com.thesis.projectopportunities.model.Project;
import com.thesis.projectopportunities.repo.ProjectRepo;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class ProjectController {

	private final ProjectRepo projectRepo;

	@Setter(onMethod_ = @Autowired)
	private ProjectMapper projectMapper;

	@GetMapping("/projects")
	public Set<ProjectDto> getProjects() {
		return projectRepo.findAll().stream().map(project -> projectMapper.toProject(project)).collect(Collectors.toSet());
	}

	@GetMapping("/projects/{id}")
	public ProjectDto getProject(@PathVariable Long id) {
		var project = projectRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
		return projectMapper.toProject(project);
	}

	@PostMapping("/projects")
	public ResponseEntity<ProjectDto> addProject(@RequestBody ProjectDto projectDto) {
		Project project = projectMapper.toProject(projectDto);
		return new ResponseEntity<>(projectMapper.toProject(projectRepo.save(project)),
			HttpStatus.CREATED);
	}

}
