import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppUserData } from "../model/access.model";
import { API_ENDPOINTS, CONSTANTS } from "../model/constants";
import { ApiResponse, PaginatedResponse, SearchRequest } from "../model/common.model";
import { Observable } from "rxjs/internal/Observable";
import { ErpCustomerDTO } from "../model/erpcustomer.model";

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {}

    createPkgUser(compid: number, user: AppUserData) {
        return this.http.post(`/api/admin/user/pkgcompuser/${compid}`, user);
    }

    createCustomerUser(compid: number, user: AppUserData) {
        return this.http.post(`/api/admin/user/customeruser/${compid}`, user);
    }

    assignToRole(userid: number, rolename: string) {
        return this.http.post(`/api/admin/user/${userid}/role/${rolename}`, {});
    }

    //search support is not there.

    getUsersOfPkgCompany(companyName: string, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<AppUserData>>> {
        return this.http.post<ApiResponse<PaginatedResponse<AppUserData>>>( API_ENDPOINTS.POST_TO_GET_ADMIN_USERS_OF_A_COMPANY(companyName), searchRequest);
    }

    getUsersOfConsCompany(companyName: string, searchRequest: SearchRequest): Observable<ApiResponse<PaginatedResponse<AppUserData>>> {
        return this.http.post<ApiResponse<PaginatedResponse<AppUserData>>>( API_ENDPOINTS.POST_TO_GET_ADMIN_USERS_OF_A_COMPANY(companyName), searchRequest);
    }

    enableOrDisablePkgUser(userId: string, enabled: boolean) {
        return this.http.put(`/api/admin/user/userid/${userId}/enabled/${enabled}/updateuserenabled`,{});
    }
    enableOrDisableConsumerUser(userId: string, enabled: boolean) {
        return this.http.put(`/api/admin/user/userid/${userId}/enabled/${enabled}/updateuserenabled`,{});
    }

    getCustomerContactAddresses(): Observable<ApiResponse<ErpCustomerDTO>> {
        return this.http.get<ApiResponse<ErpCustomerDTO>>(API_ENDPOINTS.GET_ERP_CUST_ADDRESS());
    }
    
    registerUser(consumercompid: number, users : AppUserData[]){
        return this.http.post(`/api/admin/user/registeruser/${consumercompid}`, users);
    }

    resetPassword(userId : string){
        return this.http.put(`/api/admin/user/userid/${userId}/resetpassword`, {});
    }
    
    getCustomerContactsByCompId(consumercompId : number): Observable<ApiResponse<ErpCustomerDTO>> {
        return this.http.get<ApiResponse<ErpCustomerDTO>>(API_ENDPOINTS.GET_ERP_CUST_CONTACTS_BY_COMP_ID(consumercompId));
    }
}