import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class PageService {
    constructor(private http: HttpClient) {}
    getPageAndSections(company: string, name: string) {
        return this.http.get(`/api/branding/page/${company}/${name}`);
    }
}