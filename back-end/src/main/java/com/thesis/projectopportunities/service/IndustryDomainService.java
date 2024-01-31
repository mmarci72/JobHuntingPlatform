package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.enums.IndustryDomainEnum;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class IndustryDomainService {

	public List<IndustryDomainEnum> getAllIndustryDomain() {
		return Arrays.stream(IndustryDomainEnum.values()).toList();
	}

}
