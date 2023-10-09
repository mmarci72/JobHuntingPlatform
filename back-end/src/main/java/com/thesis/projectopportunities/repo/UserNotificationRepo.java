package com.thesis.projectopportunities.repo;

import java.util.List;
import java.util.Optional;

import com.thesis.projectopportunities.model.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNotificationRepo extends JpaRepository<UserNotification, String> {

	List<UserNotification> findByEmailNotificationEnabledTrue();

	Optional<UserNotification> getByUsername(String username);
}
