import { ProjectPosition } from './project-position.model';

export class Project {
	id!: number;
	name!: string;
	description!: string;
	technologies!: string;
	creationDate!: Date;
	projectPositions!: ProjectPosition[];
	unitName!: string;

}

