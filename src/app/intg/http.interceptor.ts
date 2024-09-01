import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, mergeMap } from 'rxjs';
import { SsoService } from '../sso/sso.service';
import { StorageServie } from '../services/storage.service';

export const demoInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const keySer = inject(SsoService);
    const ss = inject(StorageServie);

    if (req.url != "/api/global/configurations123") {
        const company = ss.getData("_company") || '';
        return from (keySer.getToken()).pipe(mergeMap((token: string) => {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    company: company
                }
            });
            return next(authReq);
        }));
    } else {
        return next(req);
    }
};