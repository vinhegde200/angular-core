import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../model/constants";
import { ErpSalesOrder } from "../model/salesorder.model";

@Injectable({ providedIn: 'root' })
export class SalesOrderService {
    constructor(private http: HttpClient) {

    }

    getSalesOrdersOfCurrentUser(custCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpSalesOrder>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpSalesOrder>>>(API_ENDPOINTS.POST_TO_GET_SALES_ORDER_OF_CUSTOMER(custCompanyId), searchRequest);
    }
}