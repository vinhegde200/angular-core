import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConsCompany, ConsCompBranding } from "../model/company.model";
import { Observable } from "rxjs";
import { ApiResponse, PaginatedResponse, PortalError, SearchRequest, StatusResponse } from "../model/common.model";
import { API_ENDPOINTS } from "../model/constants";

@Injectable({ providedIn: 'root' })
export class ConsumerCompanyService {

    constructor(private http: HttpClient) {

    }

    getConsCompanies(pkgCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ConsCompany>>> {
        return this.http.post(API_ENDPOINTS.POST_TO_GET_ADMIN_CONSUMER_COMPANIES_BY_PKG_COMP_ID(pkgCompanyId), searchRequest) as Observable<ApiResponse<PaginatedResponse<ConsCompany>>>;
    }

    saveCustomerCompanies( pkgCompanyId: number, comp: ConsCompany[]): Observable<ApiResponse<Array<ConsCompany>>> {
        return this.http.post(API_ENDPOINTS.POST_ADMIN_CONSUMER_COMPANY_BY_PKG_COMP_ID(pkgCompanyId), comp) as Observable<ApiResponse<Array<ConsCompany>>>;
    }

    updateConsCompany(compid: number, comp: ConsCompany): Observable<ApiResponse<StatusResponse>> {
        return this.http.put(API_ENDPOINTS.PUT_ADMIN_CONSUMER_COMPANY_BY_ID(compid), comp) as Observable<ApiResponse<StatusResponse>>;
    }

    saveConsCompBranding(compid: number, branding: ConsCompBranding): Observable<ApiResponse<StatusResponse>> {
        return this.http.post(API_ENDPOINTS.POST_ADMIN_CONSUMER_COMPANY_BRANDING(compid), branding) as Observable<ApiResponse<StatusResponse>>;
    }

    getConsCompany(code: string): Observable<ApiResponse<ConsCompany>> {
        return this.http.get(API_ENDPOINTS.GET_ADMIN_CONSUMER_COMPANY_BY_CODE(code)) as Observable<ApiResponse<ConsCompany>>;
    }
}