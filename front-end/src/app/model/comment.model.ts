import { ProjectPosition } from './project-position.model';

export class Comment {
	data!: string;
	creationDate!: Date;
	position!: ProjectPosition;
	username!: string;
	fullName!: string;
}
