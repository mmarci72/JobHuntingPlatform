import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class BaseService {
	private readonly port = 8081;
	private readonly hostName = "localhost";
	protected readonly baseUrl = `http://${this.hostName}:${this.port}`;
}
