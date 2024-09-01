import { Injectable, inject } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Configuration } from "../model/config.model";
import { Router } from "@angular/router";
import * as jwtDecode from 'jwt-decode';
import { SettingsService } from "../services/settings.service";
import { AccessService } from "../services/access.service";

@Injectable({ providedIn: 'root' })
export class SsoService {
    configs: any = {};
    ssoProvider: string = '';
    keycloak: KeycloakService;
    keycloakInstance: Keycloak.KeycloakInstance | undefined;

    constructor(private settingService: SettingsService, private accessService: AccessService, private router: Router) {
        this.keycloak = inject(KeycloakService);
    }

    initializeSSO() {
        return new Promise(async (resolve: any, reject: any) => {
            this.settingService.getAppSettings()
                .subscribe({
                    next: async (res: any) => {
                        let _configs: Configuration[] = res.data as Configuration[];
                        this.configs = _configs.reduce((o: any, _c: Configuration) => {
                            o[_c.key] = _c.value
                            return o
                        }, {});
                        this.ssoProvider = this.configs['SsoMethod'];
                        if (this.ssoProvider == "KeyCloak") {
                            await this.initializeKeycloak(this.getKeyCloakConfig());
                        }
                        resolve(true);
                    },
                    error: (err: any) => {
                        console.log(err);
                        resolve(true);
                    }
                });
        });
    }

    private getKeyCloakConfig() {
        const kconfig = {
            config: {
                url: this.configs["KeyCloak:ExternalUrl"],
                realm: this.configs["KeyCloak:Realm"],
                clientId: this.configs["KeyCloak:Resource"],
            },
            initOptions: {
                pkceMethod: this.configs["KeyCloak:initOptions:pkceMethod"],
                redirectUri: this.configs["KeyCloak:initOptions:redirecturl"],
                checkLoginIframe: this.configs["KeyCloak:initOptions:checkLoginIframe"],
                // onLoad: 'check-sso'
            }
        };
        return kconfig;
    }

    isLoggedIn() {
        if (this.ssoProvider == 'KeyCloak') {
            return this.keycloak.isLoggedIn();
        } else {
            return this.getCookieValue('_token') != ''
        }
    }

    async login(options: any, company?: string) {
        if (this.ssoProvider == 'KeyCloak') {
            if (this.keycloakInstance == undefined) {
                this.keycloakInstance = this.keycloak.getKeycloakInstance();
            }
            if (this.keycloakInstance != undefined) {
                await this.keycloak.getKeycloakInstance().login(options);
            }
            else {
                await this.keycloak.login(options);
            }
        } else {
            if (options.prompt == 'none') {
                this.doRedirect(options.redirectUri);
            } else {
                this.router.navigate(['login', company], { queryParams: { redirect: options.redirectUri } });
            }
        }
    }

    logout(url: string) {
        if (this.ssoProvider == 'KeyCloak') {
            if (this.keycloakInstance == undefined) {
                this.keycloakInstance = this.keycloak.getKeycloakInstance();
            }
            if (this.keycloakInstance != undefined)
                this.keycloakInstance.logout({ redirectUri: url });
            else
                this.keycloak.logout(url);
        } else {
            this.accessService.logout()
                .subscribe({
                    next: (res: any) => {
                        this.doRedirect(url);
                    }
                });
        }
    }

    async getToken(): Promise<string> {
        if (this.ssoProvider == 'KeyCloak') {
            var canRefreshToken = false;
            var token = await this.keycloak.getToken();
            if (token != undefined) {
                var decodedToken = jwtDecode.jwtDecode(token);
                if (!decodedToken || !decodedToken.exp) {
                    canRefreshToken = true;
                }
                const expiryDate = new Date(0);
                expiryDate.setUTCSeconds(decodedToken.exp as number);
                canRefreshToken = expiryDate < new Date();
            }
            else {
                canRefreshToken = true;
            }
            if (canRefreshToken == true) {
                console.log('refreshing the keycloak token since its expired');
                await this.keycloakInstance?.updateToken(60 * 3);
            }
            return await this.keycloak.getToken();
        } else {
            return Promise.resolve(this.getCookieValue('_token'));
        }
    }

    async initializeKeycloak(kkConfig: any) {
        // const conf = JSON.parse(kkConfig);
        var result = await this.keycloak.init(kkConfig);
        if (result == true) {
            this.keycloakInstance = this.keycloak.getKeycloakInstance();
            if (this.keycloakInstance == null || this.keycloakInstance == undefined) {
                console.log("failed to get Keycloak instance");
            }
        }
        else {
            console.log('keycloak init failed')
        }
    }

    getCookieValue(name: string) {
        const val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
        return val;
    }

    doRedirect(url: string) {
        window.location.href = url;
        return true;
    }
}