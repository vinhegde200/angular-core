import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LangService {
    constructor(private http: HttpClient) {

    }

    getLangStrings(comp: string, lang: string) {
        return this.http.get(`/api/global/translations/${comp}/${lang}`);
    }

    getLocale() {
        // Check if user's lang preference is saved in localStorage
        let locale = localStorage.getItem("_locale");
        if (!locale) {
            locale = navigator.language || navigator.languages[0] || 'en-US';
        }
        return locale;
    }
}