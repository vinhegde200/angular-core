import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { Observable } from "rxjs";
import { ErpConsumerCompanyMap, ErpCustomer } from "../model/erpcustomer.model";
import { API_ENDPOINTS } from "../model/constants";

@Injectable({ providedIn: 'root' })
export class ErpCustomerService {
    constructor(private http: HttpClient) {

    }

    getErpCustomers(pkgCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpCustomer>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpCustomer>>>(API_ENDPOINTS.GET_ADMIN_ERP_CUSTOMERS_FOR_PKG_COMPANY(pkgCompanyId), searchRequest);
    }

    getMappedErpCustomers(pkgCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpConsumerCompanyMap>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpConsumerCompanyMap>>>(API_ENDPOINTS.POST_TO_GET_ADMIN_ERP_MAPPED_CUSTOMERS_FOR_PKG_COMPANY(pkgCompanyId), searchRequest);
    }
}