import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { ErpItem, ErpItemMap } from "../model/erpitem.model";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../model/constants";

@Injectable({ providedIn: 'root' })
export class ErpItemService {
    constructor(private http: HttpClient) { }

    getErpItems(consumerCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpItem>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpItem>>>(API_ENDPOINTS.GET_ADMIN_ERP_ITEMS_FOR_CONSUMER_COMPANY(consumerCompanyId), searchRequest);
    }

    getMappedErpItems(consumerCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpItemMap>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpItem>>>(API_ENDPOINTS.POST_TO_GET_ADMIN_ERP_MAPPED_ITEMS_FOR_CONSUMER_COMPANY(consumerCompanyId), searchRequest);
    }
}