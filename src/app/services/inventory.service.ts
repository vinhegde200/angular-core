import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { ErpItemInventory } from "../model/inventory.model";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../model/constants";

@Injectable({ providedIn: 'root' })
export class InventoryService {
    constructor(private http: HttpClient) {

    }

    getInventoryForCustomer(custCompanyId: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ErpItemInventory>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ErpItemInventory>>>(API_ENDPOINTS.POST_TO_GET_INVENTORY_OF_CUSTOMER(custCompanyId), searchRequest);
    }
}