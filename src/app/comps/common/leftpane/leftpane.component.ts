import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenuItem } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { AccessService } from '../../../services/access.service';
import { AppUserData } from '../../../model/access.model';
import { ROLES } from '../../../model/constants';

@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [
    MenubarModule,
    IconFieldModule,
    InputIconModule,
    SidebarModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.scss'
})
export class LeftpaneComponent implements OnInit {
  menuitems: MenuItem[] | undefined;
  selectedItem: MenuItem | undefined;
  sidebarVisible: boolean = false;
  @Output('itemClicked') itemClicked = new EventEmitter<MenuItem>();
  constructor(private ts: TranslateService, private as: AccessService) {
    as.userSubject.subscribe({
      next: (user: AppUserData) => {
        console.log('User Object in Left Pane');
        if (user != null) {
          this.initMenuItems(user);
        }
      }
    });
    if (this.as.user) {
      this.initMenuItems(this.as.user);
    }
  }

  ngOnInit(): void {
    // this.initMenuItems();
  }

  handleClick(item: MenuItem) {
    this.itemClicked.emit(item);
    this.selectedItem = item;
    this.sidebarVisible = false;
  }

  initMenuItems(user: AppUserData) {
    const menu: MenuItem[] = [
      {
        icon: 'pi pi-home',
        id: 'home',
        label: 'leftpane.home'
      }];
      if (user.roles && user.roles[0].name == ROLES.admin) {
        menu.push({
          icon: 'pi pi-building',
          id: 'admin/companies',
          label: 'leftpane.companies'
        });
      }
      if (user.roles && user.roles[0].name == ROLES.pkgadmin) {
        menu.push({
          icon: 'pi pi-building',
          id: 'admin/companies',
          label: 'leftpane.companies'
        });
      }
      if (user.roles && (user.roles[0].name == ROLES.consadmin || user.roles[0].name == ROLES.user)) {
        menu.push({
          icon: 'pi pi-list',
          id: 'customer/items',
          label: 'leftpane.custitems'
        });
      }
      if (user.roles && (user.roles[0].name == ROLES.consadmin)) {
        menu.push({
          icon: 'pi pi-wrench',
          id: 'customer/setup',
          label: 'leftpane.custsetup'
        });
      }
      
      menu.push({
        label: 'leftpane.settings',
        id: 'admin/settings',
        icon: 'pi pi-cog'
      });
      this.menuitems = menu;
  }
}
