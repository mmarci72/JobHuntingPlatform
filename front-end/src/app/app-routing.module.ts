import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewProjectFormComponent } from './add-project/new-project-form/new-project-form.component';
import { AuthGuard } from './auth/auth.guard';
import { CommentComponent } from './comment-module/comment/comment.component';
import { ManagePositionsComponent } from './position/manage-positions/manage-positions.component';
import { HomeComponent } from './project/home/home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{
		path: 'comment',
		component: CommentComponent,
		title: 'Comments',
		canActivate: [AuthGuard]
	},
	{
		path: 'addProject',
		component: NewProjectFormComponent,
		title: 'Add new project',
		canActivate: [AuthGuard],
		data: { roles: ['ADMIN'] }
	},
	{
		path: 'managePositions',
		component: ManagePositionsComponent,
		title: 'Manage positions',
		canActivate: [AuthGuard],
		data: { roles: ['ADMIN'] }
	},
	{
		path: 'projects',
		component: HomeComponent,
		title: 'List of projects and positions',
		canActivate: [AuthGuard]
	},
	{
		path: 'settings',
		component: SettingsComponent,
		title: 'Settings',
		canActivate: [AuthGuard]
	},
	{
		path: '**',
		redirectTo: '/projects'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
