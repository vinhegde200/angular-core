import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IntelPrompt } from "../model/intel.model";

@Injectable({providedIn: 'root'})
export class IntelService {
    constructor(private http: HttpClient) {

    }
    fillPkgCompanyEntity(prompt : IntelPrompt) {
        return this.http.post("/api/inteligence/entityfiller/pkgcompany", prompt);
    }
}