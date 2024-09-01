import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Branding, Company, AppUserData } from '../../../model/access.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { AccessService } from '../../../services/access.service';
import { ROLES } from '../../../model/constants';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-topbar-user',
  standalone: true,
  imports: [
    AvatarModule, 
    MenuModule,
    ButtonModule,
    TranslateModule,
    MenubarModule,
    CommonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ThemeSwitcherComponent
  ],
  templateUrl: './topbar-user.component.html',
  styleUrl: './topbar-user.component.scss'
})
export class TopbarUserComponent implements OnInit {
  branding: Branding | undefined;
  company: Company | undefined;
  user: AppUserData | undefined;
  // View Binding Variables
  title: string | undefined;
  avatarLabel: string = 'U';
  items: MenuItem[] | undefined;
  pageMenu: MenuItem[] = [];
  selectedPageMenu: MenuItem | undefined;

  @Input('branding') set _branding (b: Branding | undefined) {
    this.branding = b;
  }
  @Input('company') set _company (c: Company | undefined) {
    this.company = c;
    this.title = this.getTitleText();
  }
  @Input('user') set _user(u: AppUserData | undefined) {
    this.user = u;
    if (this.user) {
      this.avatarLabel = this.user.userName.substring(0, 1).toUpperCase();
    }
    this.initMenuItems();
    this.initPageMenus();
  }

  @Output('logout') logout = new EventEmitter<void>();
  @Output('signin') signin = new EventEmitter<void>();

  constructor(private ts: TranslateService, private router: Router, private as: AccessService) {

  }

  initPageMenus() {
    this.pageMenu = [
      {
        label: 'pagemenu.orders',
        command: () => {
          this.router.navigate(['customer', 'orders']);
        }
      },
      {
        label: 'pagemenu.inventory',
        command: () => {
          this.router.navigate(['customer', 'inventory']);
        }
      },
      {
        label: 'pagemenu.items',
        command: () => {
          this.router.navigate(['customer', 'items']);
        }
      }
    ]
  }

  hasAdminRole() {
    return this.as.isHavingRole(ROLES.consadmin);
  }

  showPage(menu: MenuItem) {
    this.selectedPageMenu = menu;
    if (menu.command) {
      menu.command({});
    }
  }

  initMenuItems() {
    if (this.user) {
      this.items = [
        {
            label: this.user?.userName,
            items: [
                {
                    label: 'My Profile',
                    icon: 'pi pi-user',
                    command: () => {

                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                      this.logout.emit();
                    }
                }
            ]
        }
      ];
    } else {
      this.items = [
        {
            label: 'Please Signin',
            items: [
                {
                    label: 'Signin',
                    icon: 'pi pi-sign-in',
                    command: () => {
                      this.signin.emit();
                    }
                }
            ]
        }
      ];
    }
  }

  ngOnInit(): void {
  }

  getTitleText() {
    return this.company ? this.company.title || this.company.name: "My Portal"
  }
}
