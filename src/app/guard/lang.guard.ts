import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LangService } from "../services/lang.service";

let langloaded = false;
export const loadLang: CanActivateFn = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    if (langloaded) {
        return true;
    }
    const txservice = inject(TranslateService);
    const langService = inject(LangService);
    // VH: TODO - Detect the language and then load it.
    const language = langService.getLocale();
    txservice.addLangs([language]);
    txservice.setDefaultLang('en-US');
    return new Promise((resolve, reject) => {
        txservice.use(language)
        .subscribe({
            next: (res: any) => {
                langloaded = true;
                console.log('Language is loaded now');
                resolve(true);
            }
        });
    });
}