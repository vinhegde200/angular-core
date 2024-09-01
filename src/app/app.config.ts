import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { demoInterceptor } from './intg/http.interceptor';
import { SsoService } from './sso/sso.service';
import { KeycloakService } from 'keycloak-angular';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PortalTranslateLoader } from './PortalTranslateLoader';
import { StorageServie } from './services/storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissingTxComponent } from './comps/common/missing-tx/missing-tx.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    SsoService,
    KeycloakService,
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([demoInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory(sso: SsoService) {
        return (): Promise<any> => {
          return sso.initializeSSO();
        }
      },
      multi: true,
      deps: [ SsoService ]
    },
    provideHttpClient(withInterceptorsFromDi()),
    SsoService,
    provideAnimations(),
    importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, StorageServie]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTxComponent
      }
    })),
    MessageService,
    ConfirmationService,
    importProvidersFrom(NgHttpLoaderModule.forRoot())
  ]
};

export function HttpLoaderFactory(http: HttpClient, ss: StorageServie) {
  return new PortalTranslateLoader(http, ss);
}
