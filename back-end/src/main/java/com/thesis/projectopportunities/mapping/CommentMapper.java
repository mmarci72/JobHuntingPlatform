package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.CommentDto;
import com.thesis.projectopportunities.model.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = ProjectPositionMapper.class)
public interface CommentMapper {


	CommentDto toComment(Comment comment);

	Comment toComment(CommentDto commentDto);

}
