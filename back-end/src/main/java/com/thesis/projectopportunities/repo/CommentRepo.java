package com.thesis.projectopportunities.repo;

import java.util.List;

import com.thesis.projectopportunities.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {

	List<Comment> findAllByPositionPositionId(int id);
}
