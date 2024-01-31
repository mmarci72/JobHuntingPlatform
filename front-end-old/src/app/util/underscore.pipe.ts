import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'underscore'
})
export class UnderscorePipe implements PipeTransform {

	transform(value: string): string {
		return value.toLowerCase().split('_').map(str => str[0].toUpperCase() + str.slice(1)).join(' ');
	}

}
