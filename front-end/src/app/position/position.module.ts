import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { UnderscorePipe } from '../util/underscore.pipe';
import { UtilModule } from '../util/util.module';
import { ClosePositionDialogComponent } from './close-position-dialog/close-position-dialog.component';
import { EditPositionComponent } from './edit-position/edit-position.component';
import { ManagePositionsComponent } from './manage-positions/manage-positions.component';
import { NewPositionComponent } from './new-position/new-position.component';
import { PositionFormComponent } from './position-form/position-form.component';
import { PositionTableComponent } from './position-table/position-table.component';


@NgModule({
	declarations: [
		NewPositionComponent,
		ManagePositionsComponent,
		PositionTableComponent,
		ClosePositionDialogComponent,
		EditPositionComponent,
		PositionFormComponent
	],
	imports: [
		CommonModule,
		MatSelectModule,
		NgxMatSelectSearchModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatDatepickerModule,
		MatIconModule,
		MatInputModule,
		FormsModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		UtilModule,
		MatDialogModule
	],
	providers: [
		UnderscorePipe
	]
})
export class PositionModule {}
