import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { SsoService } from "../sso/sso.service";
import { AccessService } from "../services/access.service";
import { AppUserData } from "../model/access.model";
import { CONSTANTS, ROLES } from "../model/constants";
import { PortalTheme, ThemeService } from "../services/theme.service";

export function canLoadPage(roles?: string[]): CanActivateFn {
    return async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => {
        const sso = inject(SsoService);
        const as = inject(AccessService);
        const themeService = inject(ThemeService);
        const router = inject(Router);
        let canLoad = false;
        if (sso.isLoggedIn()) {
            if (as.user) {
                canLoad = true;
            } else {
                const result: any = await validateUser(as);
                if (result && result.error) {
                    if (result.error?.code == CONSTANTS.ERR_UNAUTHORIZEZD) {
                        // User does not have access to the company
                        logout(sso);
                        canLoad = false;
                    } else {
                        canLoad = true;
                    }
                } else {
                    canLoad = true;
                }
            }
            if (canLoad) {
                if (as.user) {
                    if (await checkRoles([ROLES.admin, ROLES.pkgadmin], as.user)) {
                        themeService.switchTheme(PortalTheme.ADMIN);
                    }
                    if (await checkRoles(roles || [], as.user)) {
                        return true;
                    } else {
                        accessDenied(router);
                        return false;    
                    }
                } else {
                    accessDenied(router);
                    return false;
                }
            } else {
                accessDenied(router);
                return false;
            }
        } else {
            await sso.login({
                redirectUri: window.location.origin + '/#/' + state.url,
            });
            return false;
        }
    }
}

function logout(sso: SsoService) {
    sso.logout(`${window.location.origin}/#/error-page/210`);
}

function accessDenied(router: Router) {
    router.navigate(['error-page', 'no_access']);
}

async function checkRoles(roles: string[], user: AppUserData) {
    if (!roles || !user) {
        return false;
    }
    if (roles.length == 0 && roles[0] == ROLES.any) {
        return true;
    }
    let result = false;
    if (user && user.roles) {
        roles.forEach((role: string) => {
            let _r = user.roles?.filter(r => r.name == role) || [];
            if (_r.length > 0) {
                result = true;
            } else {
                console.log(`User does not have role ${role}`);
            }
        });
    }
    return result;
}

async function validateUser (as: AccessService) {
    return new Promise((resolve, reject) => {
        as.validateUser()
        .subscribe({
            next: (res: any) => {
                as.setUser(res.data as AppUserData);
                as.userSubject.next(res.data as AppUserData);
                resolve({});
            },
            error: (err: any) => {
                console.log(err);
                resolve(err);
            }
        });
    });
}