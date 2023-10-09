import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

import { NewProjectFormComponent } from './new-project-form/new-project-form.component';


@NgModule({
	declarations: [
		NewProjectFormComponent
	],
	imports: [
		CommonModule,
		MatInputModule,
		MatDatepickerModule,
		MatIconModule,
		MatButtonModule,
		FormsModule,
		RouterLink,
		MatOptionModule,
		MatSelectModule,
		ReactiveFormsModule
	]
})
export class AddProjectModule {}
