import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINTS, ROLES } from "../model/constants";
import { ApiResponse } from "../model/common.model";
import { Observable } from "rxjs/internal/Observable";
import { ColumnPreference, UserPreferences } from "../model/userpreferences.model";
import { firstValueFrom } from "rxjs";
import { TableMetadataService } from "./tablemetadata.service";

@Injectable({providedIn: 'root'})
export class UserPreferencesService {
    constructor(private http: HttpClient, private tableMetadataService: TableMetadataService) {}

    createUserPreferences(userPreferences: UserPreferences): Observable<ApiResponse<UserPreferences>> {
        return this.http.post<ApiResponse<UserPreferences>>(API_ENDPOINTS.POST_CREATE_USER_PREFERENCES, userPreferences);
    }

    updateUserPreferences(preferenceId: number, userPreferences: UserPreferences): Observable<ApiResponse<boolean>> {
        return this.http.put<ApiResponse<boolean>>(API_ENDPOINTS.PUT_UPDATE_USER_PREFERENCES(preferenceId), userPreferences);
    }

    getUserPreferences(userId: number): Observable<ApiResponse<UserPreferences[]>> {
        return this.http.get<ApiResponse<UserPreferences[]>>(API_ENDPOINTS.GET_USER_PREFERENCES(userId));
    }

    getCurrentUserPreferences():Observable<ApiResponse<UserPreferences[]>> {
        return this.http.get<ApiResponse<UserPreferences[]>>(API_ENDPOINTS.GET_CURRENT_USER_PREFERENCES);
    }

    deleteUserPreferences(preferenceId: number): Observable<ApiResponse<boolean>> {
        return this.http.delete<ApiResponse<boolean>>(API_ENDPOINTS.DELETE_USER_PREFERENCES(preferenceId));
    }

    getUserPreferencesForTable(userId: number, tableName: string): Observable<ApiResponse<UserPreferences[]>> {
        return this.http.get<ApiResponse<UserPreferences[]>>(API_ENDPOINTS.GET_USER_PREFERENCES_FOR_TABLE_NAME(userId, tableName));
    }

    async loadAndGetUserPreferences(userid: number, tableName: string): Promise<UserPreferences | undefined> {
        var userPreferences: UserPreferences| undefined = undefined;
        var isPreferredLoaded: boolean = false;
        var response = await firstValueFrom(this.getUserPreferencesForTable(userid, tableName));
        if (response != undefined && response.data?.length > 0) {
          var allActiveUserPreferences = response.data.filter(o => o.isActive == true);
          if (allActiveUserPreferences?.length > 0) {
            userPreferences = allActiveUserPreferences[0];
            isPreferredLoaded = true;
          }
        }
        if (isPreferredLoaded == false) {
          try {
            var tableMetadata = await firstValueFrom(this.tableMetadataService.getTableMetadata(tableName));
            var columnDetails = tableMetadata.data.columnDetails.filter(cd => cd.visibleToRoles.includes(ROLES.user) && cd.isPreferred == true);
            var columnPreferences: ColumnPreference[] = [];
            columnDetails.forEach(cd => {
              columnPreferences.push({
                columnName: cd.columnName,
                columnDisplayName: cd.columnDisplayName,
                isPinned: false,
                isFilterable: cd.isFilterable,
                columnType: cd.columnType,
                order: cd.order,
                isVisible: true,
              })
            });
            userPreferences = {
              userId: userid,
              tableName: tableName,
              columnPreferences: columnPreferences
            };
          }
          catch (ex) {
            console.log(`failed to load column preferences for table ${tableName}`);
          }
        }
        return userPreferences;
      }

}