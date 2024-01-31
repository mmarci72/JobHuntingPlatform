import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UnderscorePipe } from './underscore.pipe';


@NgModule({
	declarations: [UnderscorePipe],
	imports: [
		CommonModule
	],
	exports: [
		UnderscorePipe
	]
})
export class UtilModule {}
