import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Comment } from "../model/comment.model";
import { SessionStorageService } from "./session-storage.service";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class CommentService extends BaseService {
	constructor(
		private readonly http: HttpClient,
		private readonly sessionStorageService: SessionStorageService,
	) {
		super();
	}

	getComments() {
		return this.http.get<Comment[]>(`${this.baseUrl}/comments`);
	}

	getCommentsForPosition(positionId: number) {
		return this.http.get<Comment[]>(`${this.baseUrl}/positions/${positionId}/comments`);
	}

	getComment(commentId: number) {
		return this.http.get<Comment[]>(`${this.baseUrl}/comments/${commentId}`);
	}

	async createComment(comment: Comment) {
		comment.username = (await this.sessionStorageService.getUser()).username as string;
		return this.http.post<Comment>(`${this.baseUrl}/comments`, comment);
	}
}
