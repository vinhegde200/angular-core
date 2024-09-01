import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configuration, Translation } from "../model/config.model";
import { API_ENDPOINTS } from "../model/constants";

@Injectable({ providedIn: 'root' })
export class SettingsService {
    constructor(private http: HttpClient) {

    }

    getAppSettings() {
        return this.http.get(API_ENDPOINTS.GET_APP_CONFIGURATIONS);
    }

    saveAppSettings(configs: Configuration[]) {
        return this.http.post(API_ENDPOINTS.POST_APP_CONFIGURATIONS, configs);
    }

    getTenantSettings(tenantId: number) {
        return this.http.get(API_ENDPOINTS.GET_TENANT_CONFIGURATIONS(tenantId));
    }

    saveTenantSettings(tenantId: number, configs: Configuration[]) {
        return this.http.post(API_ENDPOINTS.POST_TENANT_CONFIGURATIONS(tenantId), configs);
    }

    getTranslations(langid: number) {
        return this.http.get(API_ENDPOINTS.GET_TRANSLATIONS_FOR_LANGUAGE(langid));
    }

    getLanguages() {
        return this.http.get(API_ENDPOINTS.GET_ALL_TRANSLATION_LANGUAGES);
    }

    saveLanguages(lang: string, langObj: Translation) {
        return this.http.post(API_ENDPOINTS.POST_TRANSLATIONS_FOR_LANGUAGE(lang), langObj);
    }
}