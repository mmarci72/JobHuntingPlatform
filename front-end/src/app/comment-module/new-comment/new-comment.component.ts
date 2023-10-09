import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { Comment } from '../../model/comment.model';
import { ProjectPosition } from '../../model/project-position.model';
import { CommentService } from '../../services/comment.service';

@Component({
	selector: 'app-new-comment',
	templateUrl: './new-comment.component.html',
	styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {
	commentText!: string;
	isAddNewComment = false;
	@Input() position!: ProjectPosition;
	@Input() comments!: Comment[];

	toggleAddNewComment() {
		this.isAddNewComment = !this.isAddNewComment;
	}

	addNewComment() {
		const newComment = new Comment();
		newComment.data = this.commentText;
		newComment.creationDate = new Date();
		newComment.position = this.position;


		this.commentService.createComment(newComment).then(result => {
			result.pipe(catchError((err: HttpErrorResponse) => {
				this.openSnackBar('Error uploading your comment', 'Ok');
				console.error(err)
				return of(null)
			})).subscribe((comment) => {
				if (comment) {
					this.comments.push(comment)
					this.openSnackBar('Comment successfully saved', 'Ok');
				}
			})
		});

		this.commentText = '';
		this.isAddNewComment = false;
	}

	cancelNewComment() {
		this.isAddNewComment = false;
		this.commentText = '';
	}

	constructor(
		private readonly commentService: CommentService,
		private readonly snackBar: MatSnackBar,
		readonly router: Router
	) {
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, { duration: 2000 });
	}
}
