import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { AccessService } from '../../../services/access.service';
import { Observable, of, throwError } from 'rxjs';
import { TestData } from '../../../testdata/access.data';
import { By } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [provideHttpClient(), KeycloakService, ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login button is disabled when password is not entered', (() => {    
    const loginComp: LoginComponent = fixture.componentInstance;
    loginComp.loginForm.get('loginid')?.setValue('testuser@abc.com');
    fixture.detectChanges();

    let disabled = fixture.debugElement.query(By.css('#_login-button')).nativeElement.disabled;
    expect(disabled).toBe(true);
  }));

  it('Login button is enabled when values are entered', (() => {    
    const loginComp: LoginComponent = fixture.componentInstance;
    loginComp.loginForm.get('loginid')?.setValue('testuser@abc.com');
    loginComp.loginForm.get('password')?.setValue('testpassword');
    fixture.detectChanges();

    let disabled = fixture.debugElement.query(By.css('#_login-button')).nativeElement.disabled;
    expect(disabled).toBe(false);
  }));

  it('should login successfully', () => {
    let td = new TestData();
    let service = fixture.debugElement.injector.get(AccessService);
    spyOn(service, "login").and.callFake(() => {
      return of(td.loginresponse_success)
    });
    const loginComp: LoginComponent = fixture.componentInstance;
    loginComp.loginForm.get('loginid')?.setValue('testuser@abc.com');
    loginComp.loginForm.get('password')?.setValue('p@ssw0rd');
    loginComp.login();
    expect(loginComp.loginSuccess).toBe(true);
  });

  it('should fail to login', fakeAsync(() => {
    let td = new TestData();
    let service = fixture.debugElement.injector.get(AccessService);
    spyOn(service, "login").and.returnValue(throwError(() => { 
      throw td.loginresponse_error 
    }));
    
    const loginComp: LoginComponent = fixture.componentInstance;
    loginComp.loginForm.get('loginid')?.setValue('testuser@abc.com');
    loginComp.loginForm.get('password')?.setValue('wrongpass');
    fixture.detectChanges();
    console.log('About to Login ...');

    loginComp.login();
    flush();
    expect(loginComp.loginSuccess).toBe(false);
    // Check if the error is displayed
    fixture.detectChanges();
    expect(loginComp.errormsg).toBe("Invalid username or password");
    let errText = fixture.debugElement.query(By.css('#_login-error-msg')).nativeElement.innerText;
    expect(errText).toBe("Invalid username or password");
  }));
});
