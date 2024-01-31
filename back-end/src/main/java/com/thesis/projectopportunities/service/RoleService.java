package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.enums.RoleEnum;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class RoleService {
	public List<RoleEnum> getAllRole() {
		return Arrays.stream(RoleEnum.values()).toList();
	}
}
