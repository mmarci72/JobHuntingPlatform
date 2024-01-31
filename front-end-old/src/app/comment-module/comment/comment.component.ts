import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Comment } from '../../model/comment.model';
import { ProjectPosition } from '../../model/project-position.model';
import { CommentService } from '../../services/comment.service';
import { PositionService } from '../../services/position.service';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	position: ProjectPosition = new ProjectPosition()
	comments: Comment[] = [];

	currentProjectName!: string

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.positionService.getPositionById(params['id'])
				.subscribe(value => {
					this.position = value;
					this.commentService.getCommentsForPosition(this.position.positionId)
						.subscribe(comments => this.comments = comments);
				});
			this.currentProjectName = params['projectName']
		})
	}


	constructor(
		private readonly commentService: CommentService,
		private readonly route: ActivatedRoute, readonly router: Router,
		private readonly positionService: PositionService
	) {
	}


}
