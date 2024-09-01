import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AccessService } from "../services/access.service";
import { inject } from "@angular/core";
import { Company } from "../model/access.model";
import { StorageServie } from "../services/storage.service";
import { ThemeService } from "../services/theme.service";

let brandloaded = false;
export const loadBranding: CanActivateFn = async (
    route: ActivatedRouteSnapshot
) => {
    if (brandloaded) {
        return true;
    }
    const accService = inject(AccessService);
    const ss = inject(StorageServie);
    const ts = inject(ThemeService);
    let company = route.params["company"];

    if (company != null) {
        ss.company = company;
        ss.saveData("_company", company);
    }

    if (company == null || company == "") {
        company = localStorage.getItem('_company');
    }
    if (company == null || company == "") {
        return true;
    }
    return new Promise((resolve, reject) => {
        accService.getCompany(company)
        .subscribe({
            next: (res: any) => {
                const comp: Company = res.data as Company;
                accService.setCompany(comp);
                accService.companySubject.next(comp);
                accService.brandingSubject.next(comp.branding);
                resolve(true);
            },
            error: (err: any) => {
                resolve(true);
            }
        })
    });
}
