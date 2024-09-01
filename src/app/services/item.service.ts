import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConsumerCompanyItemMap, Item } from "../model/item.model";
import { Observable } from "rxjs";
import { ApiResponse, PaginatedResponse, SearchRequest, StatusResponse } from "../model/common.model";
import { UpdateConsumerCmpItemsRequest, UpdatePkgCmpConsumerCmpItemsRequest } from "../model/company.model";
import { API_ENDPOINTS } from "../model/constants";
import { ErpItemPrice } from "../model/erpitem.price";

@Injectable({ providedIn: 'root' })
export class ItemService {
    constructor(private http: HttpClient) { }

    getItemsOfCustomer(custcompanyid: number, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ConsumerCompanyItemMap>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ConsumerCompanyItemMap>>>(API_ENDPOINTS.POST_TO_GET_ADMIN_CONSUMER_COMPANY_ITEM_MAP(custcompanyid), searchRequest);
    }

    updateItemConsumerVisibility(pkgCompanyId: number, consumerCompId: number, body: UpdatePkgCmpConsumerCmpItemsRequest[]): Observable<ApiResponse<StatusResponse>> {
        return this.http.patch<ApiResponse<StatusResponse>>(API_ENDPOINTS.UPDATE_ADMIN_PACK_COMP_CONSUMER_COMP_ITEM_MAP(pkgCompanyId, consumerCompId), body);
    }

    updateItemUserVisibility(consumerCompId: number, body: UpdateConsumerCmpItemsRequest[]): Observable<ApiResponse<StatusResponse>> {
        return this.http.patch<ApiResponse<StatusResponse>>(API_ENDPOINTS.UPDATE_ADMIN_CONSUMER_COMP_ITEM_MAP(consumerCompId), body);
    }

    getItemsOfCurrentUser(searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<ConsumerCompanyItemMap>>> {
        return this.http.post<ApiResponse<PaginatedResponse<ConsumerCompanyItemMap>>>(API_ENDPOINTS.POST_TO_GET_ADMIN_CONSUMER_COMP_ITEM_MAPS_FOR_CURRENT_USER, searchRequest);
    }

    saveItems(custCompanyId: number, items: Item[]): Observable<ApiResponse<Item[]>> {
        return this.http.post<ApiResponse<Item[]>>(API_ENDPOINTS.POST_ADMIN_CONSUMER_COMP_ITEM(custCompanyId), items);
    }

    getItemPriceBreakup(custCompId: number, itemId: number) {
        return this.http.get<ApiResponse<ErpItemPrice>>(API_ENDPOINTS.GET_ITEM_PRICE_BREAKUP_FOR_CUST_ITEM(custCompId, itemId));
    }
}