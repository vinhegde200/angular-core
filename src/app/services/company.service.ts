import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PkgCompBranding, PkgCompany } from "../model/company.model";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { API_ENDPOINTS } from "../model/constants";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class CompanyService {
    constructor(private http: HttpClient) {

    }

    getPkgCompanies(searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<PkgCompany>>> {
        return this.http.post<ApiResponse<PaginatedResponse<PkgCompany>>>(API_ENDPOINTS.POST_TO_GET_ADMIN_PKG_COMPANIES, searchRequest);
    }

    getPkgCompany(code: string): Observable<ApiResponse<PkgCompany>> {
        return this.http.get<ApiResponse<PkgCompany>>(API_ENDPOINTS.GET_ADMIN_PKG_COMPANY_BY_CODE(code));
    }

    savePkgCompany(comp: PkgCompany[]): Observable<ApiResponse<PkgCompany[]>> {
        return this.http.post<ApiResponse<PkgCompany[]>>(API_ENDPOINTS.POST_ADMIN_PKG_COMPANY, comp);
    }

    updatePkgCompany(compid: number, comp: PkgCompany): Observable<ApiResponse<PkgCompany>> {
        return this.http.put<ApiResponse<PkgCompany>>(API_ENDPOINTS.UPDATE_ADMIN_PKG_COMPANY_BY_ID(compid), comp);
    }

    savePkgCompBranding(compid: number, branding: PkgCompBranding): Observable<ApiResponse<PkgCompBranding>> {
        return this.http.post<ApiResponse<PkgCompBranding>>(API_ENDPOINTS.POST_ADMIN_PKG_COMPANY_BRANDING(compid), branding);
    }
}