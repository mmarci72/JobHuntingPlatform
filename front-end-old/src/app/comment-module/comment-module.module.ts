import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UtilModule } from '../util/util.module';
import { CommentComponent } from './comment/comment.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { NewCommentComponent } from './new-comment/new-comment.component';


@NgModule({
	declarations: [
		CommentComponent,
		NewCommentComponent,
		CommentCardComponent
	],
	imports: [
		CommonModule,
		UtilModule,
		MatInputModule,
		FormsModule,
		MatSnackBarModule
	]
})
export class CommentModule {}
