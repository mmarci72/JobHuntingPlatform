package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.NotificationQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationQueueRepo extends JpaRepository<NotificationQueue, Integer> {

}
