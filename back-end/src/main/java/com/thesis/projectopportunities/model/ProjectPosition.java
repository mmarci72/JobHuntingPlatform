package com.thesis.projectopportunities.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_position")
public class ProjectPosition {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int positionId;

	private String roleName;

	private String seniorityName;

	private int numberOfOpenPositions;

	private int farming;

	private LocalDateTime startDate;

	private LocalDateTime postDate;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id")
	@JsonIgnore
	private Project project;


	@OneToMany(targetEntity = Comment.class, mappedBy = "position", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Comment> comments;
}
