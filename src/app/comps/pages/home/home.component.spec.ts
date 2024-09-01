import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccessService } from '../../../services/access.service';
import { of } from 'rxjs';
import { BrandingTestData } from '../../../testdata/branding.data';
import { By } from '@angular/platform-browser';
import { SsoService } from '../../../sso/sso.service';
import { KeycloakService } from 'keycloak-angular';
import { MockSsoService } from '../../../testdata/mock-services/mock.sso.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageService } from '../../../services/page.service';
import { MessageService } from 'primeng/api';

const params = {
  get: function() {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        KeycloakService,
        AccessService,
        MessageService,
        {
          provide: SsoService,
          useClass: MockSsoService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({company: 'nestle'}),
            queryParamMap: of (params)
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    let service = fixture.debugElement.injector.get(SsoService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load Company', fakeAsync(() => {
    const comp = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(AccessService);
    let Keyservice = fixture.debugElement.injector.get(SsoService);
    let pageService = fixture.debugElement.injector.get(PageService);
    const btd = new BrandingTestData();
    const company = btd.comp;
    const branding = btd.branding;
    const user = btd.user_1;
    const page = btd.page;
  
    spyOn(service, "getCompany").and.callFake(() => {
      return of(company)
    });
    spyOn(service, "getBranding").and.callFake(() => {
      return of(branding)
    });
    spyOn(service, "validateUser").and.callFake(() => {
      return of(user)
    });
    spyOn(pageService, "getPageAndSections").and.callFake(() => {
      return of(page)
    });
    spyOn(Keyservice, "isLoggedIn").and.returnValue(true);

    comp.loadCompany('nestle');
    comp.loadBranding('nestle');
    fixture.detectChanges();
    flush();

    expect(comp.branding).toBeTruthy();
    expect(comp.branding?.introText).toBe(branding.data.introText);
    
    // const introtext = fixture.debugElement.query(By.css('#_branding_introtext_p')).nativeElement.innerText;
    // expect(introtext).toBe(branding.data.introtext);
  }));
});
