import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Comment } from '../../model/comment.model';
import { ProjectPosition } from '../../model/project-position.model';

@Component({
	selector: 'app-comment-card',
	templateUrl: './comment-card.component.html',
	styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {

	@Input() position!: ProjectPosition;
	@Input() comments: Comment[] = [];

	constructor(
		readonly router: Router
	) {
	}
}
