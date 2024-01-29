package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.enums.SeniorityEnum;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SeniorityService {

	public List<SeniorityEnum> getAllSeniority() {
		return Arrays.stream(SeniorityEnum.values()).toList();
	}

}
