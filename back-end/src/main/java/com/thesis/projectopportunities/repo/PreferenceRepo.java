package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferenceRepo extends JpaRepository<Preference, String> {

}
