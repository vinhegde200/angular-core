import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: string = 'default-theme';
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(name?: string): void {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (name === PortalTheme.DEFAULT) {
      this.theme = 'blue-theme';
      themeLink.href = 'blue-theme' + '.css';
      return;
    } else if (name == PortalTheme.RED) {
        this.theme = 'red-theme';
        themeLink.href = 'red-theme' + '.css';
        return;
    } else if (name == PortalTheme.DARK_BLUE) {
        this.theme = 'darkblue-theme';
        themeLink.href = 'darkblue-theme' + '.css';
        return;
    } else if (name == PortalTheme.ADMIN) {
        this.theme = 'admin-theme';
        themeLink.href = 'admin-theme' + '.css';
        return;
    } else if (name == PortalTheme.BLUE) {
        this.theme = 'blue-theme';
        themeLink.href = 'blue-theme' + '.css';
        return;
    }
    themeLink.href = 'default-theme' + '.css';
    this.theme = 'default-theme';
  }
}

export enum PortalTheme {
    ADMIN = 'admin',
    BLUE = 'blue',
    DARK_BLUE = 'darkblue',
    RED = 'red',
    DEFAULT = 'default'
}