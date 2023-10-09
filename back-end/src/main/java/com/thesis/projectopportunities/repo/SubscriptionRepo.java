package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepo extends JpaRepository<Subscription, String> {

}
