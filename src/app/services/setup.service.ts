import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SetupDTO } from "../comps/adminpg/initial-setup/setup/setup.model";

@Injectable({providedIn: 'root'})
export class SetupService {
    constructor(private http: HttpClient) {}

    doInitialSetup(dto: SetupDTO) {
        return this.http.post("/api/localadmin/setup", dto);
    }
}