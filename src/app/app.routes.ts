import { Routes } from '@angular/router';
import { canLoadPage } from './guard/auth.guard';
import { loadLang } from './guard/lang.guard';
import { loadBranding } from './guard/branding.guard';
import { ROLES } from './model/constants';

export const routes: Routes = [
    {
        path: 'login/:company',
        loadComponent: () => import('./comps/pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [loadLang]
    },
    { 
        path: '',
        loadComponent: () => import('./comps/pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [loadLang]
    },
    {
        path: 'home',
        loadComponent: () => import('./comps/pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [loadLang, loadBranding]
    },
    {
        path: 'post-login/:company',
        loadComponent: () => import('./comps/pages/post-login/post-login.component').then(m => m.PostLoginComponent),
        canActivate: [loadLang, canLoadPage([ROLES.pkgadmin, ROLES.admin, ROLES.consadmin, ROLES.user])]
    },
    { 
        path: 'admin/settings',
        loadComponent: () => import('./comps/adminpg/settings/settings.component').then(m => m.SettingsComponent),
        canActivate: [canLoadPage([ROLES.admin]), loadLang, loadBranding]
    },
    { 
        path: 'admin/configurations',
        loadComponent: () => import('./comps/adminpg/configurations/configurations.component').then(m => m.ConfigurationsComponent),
        canActivate: [canLoadPage([ROLES.admin]), loadLang, loadBranding]
    },
    { 
        path: 'admin/languages',
        loadComponent: () => import('./comps/adminpg/translation/translation.component').then(t => t.TranslationComponent),
        canActivate: [canLoadPage([ROLES.admin]), loadLang, loadBranding]
    },
    {
        path: 'error-page/:code',
        loadComponent: () => import('./comps/common/error-page/error-page.component').then(c => c.ErrorPageComponent),
        canActivate: [loadLang]
    },
    {
        path: 'admin/setup',
        loadComponent: () => import('./comps/adminpg/initial-setup/initial-setup.component').then(c => c.InitialSetupComponent),
        data: {
            hideHeaders: true
        }
    }
];
