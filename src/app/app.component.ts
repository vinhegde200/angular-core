import { Component, Host, HostListener } from '@angular/core';
import { ActivationStart, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './comps/common/topbar/topbar.component';
import { LeftpaneComponent } from './comps/common/leftpane/leftpane.component';
import { AccessService } from './services/access.service';
import { AppUserData, Branding, Company } from './model/access.model';
import { SsoService } from './sso/sso.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageServie } from './services/storage.service';
import { MenuItem } from 'primeng/api';
import { ErrorDlgComponent } from './comps/common/error-dlg/error-dlg.component';
import { ToastModule } from 'primeng/toast';
import { MissingTxComponent } from './comps/common/missing-tx/missing-tx.component';
import { ROLES } from './model/constants';
import { TopbarUserComponent } from './comps/common/topbar-user/topbar-user.component';
import { CommonModule } from '@angular/common';
import { PlatformService } from './services/platform.service';
import { InlineConfirmComponent } from './comps/common/inline-confirm/inline-confirm.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    TopbarUserComponent,
    LeftpaneComponent,
    ErrorDlgComponent,
    ToastModule,
    MissingTxComponent,
    CommonModule,
    InlineConfirmComponent,
    NgHttpLoaderModule,
    ConfirmDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'rportal';
  branding: Branding | undefined;
  company: Company | undefined;
  user: AppUserData | undefined;
  hideHeaders: boolean = false;
  constructor(private as: AccessService,
    private readonly keyService: SsoService,
    private readonly ss: StorageServie,
    private readonly txservice: TranslateService,
    private readonly router: Router, private ps: PlatformService) {
    this.as.brandingSubject.subscribe(branding => {
      this.branding = branding;
    });
    this.as.companySubject.subscribe(company => {
      this.company = company;
    });
    this.as.userSubject.subscribe(user => {
      this.user = user;
    });
    this.txservice.addLangs(['en']);
    this.router.events.subscribe((evt: any) => {
      if (evt instanceof ActivationStart) {
        console.log("Navigation completed ... ", evt);
        const _event: ActivationStart = evt as ActivationStart;
        if (_event.snapshot.data["hideHeaders"] == true) {
          this.hideHeaders = true;
        } else {
          this.hideHeaders = false;
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event?: any) {
    console.log("Window Event => ", event);
    this.ps.windowResized();
  }

  isCustomerUser() {
    return this.as.isHavingRole(ROLES.consadmin) || this.as.isHavingRole(ROLES.user);
  }

  isAdminUser() {
    return this.as.isHavingRole(ROLES.admin) || this.as.isHavingRole(ROLES.pkgadmin);
  }

  userNotLoggedIn() {
    return this.as.user == null;
  }

  logoutUser() {
    let company = this.getCompany();
    this.keyService.logout(`${window.location.origin}/#/home/${company}`);
  }

  signInUser() {
    let company = this.getCompany();
    this.keyService.login({
      redirectUri:  `${window.location.origin}/#/post-login/${company}`,
    }, company);
  }

  navigate(item: MenuItem) {
    this.router.navigate([item.id]);
  }

  getCompany() {
    let company : string | undefined;
    if (this.company && this.company.code) {
        company = this.company.code;
    }
    if (company == null) {
      company = this.ss.getData("_company") as string;
    }
    return company;
  }
}
