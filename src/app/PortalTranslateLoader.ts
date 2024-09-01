import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, flatMap, mergeMap, of } from "rxjs";
import { StorageServie } from "./services/storage.service";

export class PortalTranslateLoader implements  TranslateLoader {
    constructor(private http: HttpClient, private ss: StorageServie) {}
    getTranslation(lang: string): Observable<any> {
        return this.http.get(`/api/global/translations/${this.ss.company}/${lang}`)
            .pipe(mergeMap((data: any) => {
                let tx: any = data.data.txJson;
                tx = JSON.parse(tx);
                return of(tx);
            }));
    }
}

export class MockTranslationLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of ({});
    }
}