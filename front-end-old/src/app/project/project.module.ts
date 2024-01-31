import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { CommentModule } from '../comment-module/comment-module.module';
import { UtilModule } from '../util/util.module';
import { HomeComponent } from './home/home.component';
import { InterestDialogComponent } from './interest-dialog/interest-dialog.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectRoutingModule } from './project-routing-module';
import { ProjectTableComponent } from './project-table/project-table.component';


@NgModule({
	declarations: [
		ProjectCardComponent,
		HomeComponent,
		ProjectTableComponent,
		InterestDialogComponent
	],
	imports: [
		CommonModule,
		ProjectRoutingModule,
		MatInputModule,
		MatTableModule,
		MatPaginatorModule,
		FormsModule,
		UtilModule,
		NgOptimizedImage,
		MatSortModule,
		RouterLink,
		CommentModule,
		MatDialogModule,
		MatButtonModule,
		MatSelectModule,
		MatCheckboxModule
	]
})
export class ProjectModule {}
