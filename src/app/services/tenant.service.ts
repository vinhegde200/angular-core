import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TenantService {
    constructor(private http: HttpClient) {
    }

    getTenants() {
        return this.http.get("/api/admin/tenant");
    }
}