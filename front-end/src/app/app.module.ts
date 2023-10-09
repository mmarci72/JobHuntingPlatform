import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AddProjectModule } from './add-project/add-project.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { PositionModule } from './position/position.module';
import { ProjectModule } from './project/project.module';
import { SettingsComponent } from './settings/settings.component';
import { SettingsPreferencesComponent } from './settings-preferences/settings-preferences.component';
import { UtilModule } from './util/util.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SettingsComponent,
		SettingsPreferencesComponent
	],
	imports: [
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		NgOptimizedImage,
		MatTableModule,
		MatSortModule,
		NoopAnimationsModule,
		MatButtonModule,
		MatCardModule,
		AuthModule,
		UtilModule,
		MatDialogModule,
		MatMenuModule,
		ProjectModule,
		MatInputModule,
		AddProjectModule,
		MatNativeDateModule,
		PositionModule,
		MatCheckboxModule,
		MatSnackBarModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode(),
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:5000'
		}),
		MatOptionModule,
		MatSelectModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
