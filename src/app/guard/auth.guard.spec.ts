import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot } from '@angular/router';
import { AppUserData } from '../model/access.model';
import { canLoadPage } from './auth.guard';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { MockSsoService } from '../testdata/mock-services/mock.sso.service';
import { SsoService } from '../sso/sso.service';
import { KeycloakService } from 'keycloak-angular';
import { AccessService } from '../services/access.service';
import { of } from 'rxjs';

describe('AuthGuard_CanLoadPage', () => {

    beforeEach(async () => {
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [RouterModule.forRoot([])],
          providers: [
                provideHttpClient(),
                {
                    provide: SsoService,
                    useClass: MockSsoService
                },
                AccessService,
                KeycloakService
            ]
        })
        .compileComponents();
    });

    // User is logged in and has required roles
    it('should allow page load when user is logged in and has required roles', async () => {
        const accessServiceMock = TestBed.inject(AccessService);
        const ssoServiceMock = jasmine.createSpyObj('SsoService', ['isLoggedIn', 'login']);

        const routerMock = jasmine.createSpyObj('Router', ['navigate']);
        const user = { roles: [{ name: 'admin' }] } as AppUserData;

        ssoServiceMock.isLoggedIn.and.returnValue(true);
        

        spyOn(accessServiceMock, "validateUser").and.callFake(() => {
            return of ({data: user});
        });

        const canActivateFunction = canLoadPage(['admin']);

        const result = await TestBed.runInInjectionContext(() => {
            return canActivateFunction({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
        });
        expect(result).toBeTrue();
    });
});
