import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppUserData, Branding, Company, Role } from "../model/access.model";
import { API_ENDPOINTS, ROLES } from "../model/constants";

@Injectable({ providedIn: 'root' })
export class AccessService {

    companySubject = new Subject<Company>();
    brandingSubject = new Subject<Branding | undefined>()
    userSubject = new Subject<AppUserData>();
    user: AppUserData | null = null;
    company: Company | null = null;

    constructor(private http: HttpClient) {
    }

    setUser(user: AppUserData) {
        this.user = user;
        this.userSubject.next(user);
    }
    setCompany(comp: Company) {
        this.company = comp;
    }

    login(loginid: string, password: string, company: string) {
        return this.http.post(API_ENDPOINTS.POST_LOGIN, { loginid, password, company });
    }

    logout() {
        return this.http.get(API_ENDPOINTS.GET_LOGOUT);
    }

    validateUser() {
        return this.http.get(API_ENDPOINTS.GET_VALIDATE_USER);
    }

    getRoleAndPermission() {
        return this.http.get(API_ENDPOINTS.GET_PERMISSIONS);
    }

    getCompany(compName: string) {
        return this.http.get(API_ENDPOINTS.GET_COMPANY_ALONG_WITH_BRANDING(compName));
    }

    getBranding(compName: string) {
        return this.http.get(API_ENDPOINTS.GET_BRANDING_FOR_COMPANY(compName));
    }

    isHavingRole(role: string): boolean {
        return this.user?.roles?.some((r: any) => r.name === role) || false;
    }

    isAnyAdmin() {
        return this.user?.roles?.some((r: any) => r.name === ROLES.admin) || this.user?.roles?.some((r: any) => r.name === ROLES.pkgadmin) || this.user?.roles?.some((r: any) => r.name === ROLES.consadmin) || false;
    }

    getHighPrivilegeRole(): ROLES {
        var highRole: ROLES = ROLES.user;
        if (this.user != undefined && this.user.roles != undefined && this.user.roles?.length > 0) {
            this.user.roles.forEach(role => {
                if (highRole != ROLES.admin && role.name === ROLES.admin) {
                    highRole = ROLES.admin;
                }
                else if (highRole != ROLES.pkgadmin && highRole != ROLES.admin && role.name === ROLES.pkgadmin) {
                    highRole = ROLES.pkgadmin;
                }
                else if (highRole != ROLES.consadmin && highRole != ROLES.pkgadmin && highRole != ROLES.admin && role.name === ROLES.consadmin) {
                    highRole = ROLES.consadmin;
                }
                else if (highRole != ROLES.broker && highRole != ROLES.consadmin && highRole != ROLES.pkgadmin && highRole != ROLES.admin && role.name === ROLES.broker) {
                    highRole = ROLES.broker;
                }
                else if (role.name === ROLES.user) {
                    highRole = ROLES.user;
                }
            });
        }
        return highRole;
    }
}