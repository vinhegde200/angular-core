import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINTS } from "../model/constants";
import { ApiResponse } from "../model/common.model";
import { Observable } from "rxjs/internal/Observable";
import { TableMetadata } from "../model/tablemetadata.model";

@Injectable({ providedIn: 'root' })
export class TableMetadataService {
    constructor(private http: HttpClient) { }

    getTableMetadata(tableName: string): Observable<ApiResponse<TableMetadata>> {
        return this.http.get<ApiResponse<TableMetadata>>(API_ENDPOINTS.GET_TABLE_METADATA(tableName));
    }

    updateTableMetadata(tableName: string, tableMetadata: TableMetadata): Observable<ApiResponse<TableMetadata>> {
        return this.http.put<ApiResponse<TableMetadata>>(API_ENDPOINTS.UPDATE_TABLE_METADATA(tableName), tableMetadata);
    }
}