import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { API_ENDPOINTS } from "../model/constants";
import { Observable } from "rxjs";
import { ErpCompany, ErpPkgCompanyMap } from "../model/erpcompany.model";

@Injectable({ providedIn: 'root' })
export class ErpCompanyService {
    constructor(private http: HttpClient) {

    }

    getErpCompanies(searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpCompany>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpCompany>>>(API_ENDPOINTS.GET_ADMIN_ERP_COMPANIES, searchRequest);
    }

    getMappedErpCompanies(tenantId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpPkgCompanyMap>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpPkgCompanyMap>>>(API_ENDPOINTS.POST_TO_GET_ADMIN_ERP_MAPPED_COMPANIES(tenantId), searchRequest);
    }
}