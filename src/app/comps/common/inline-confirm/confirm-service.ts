import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService } from "primeng/api";

@Injectable({providedIn: 'root'})
export class ConfirmService {
    constructor(private confirmService: ConfirmationService,
        private translator: TranslateService
    ) {}
    getConfirmation(confirm: UserConfirmation, event: Event) {
        this.confirmService.confirm({
            target: event.target as EventTarget,
            message: this.translator.instant(confirm.message, confirm.args),
            icon: 'pi pi-exclamation-circle danger',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            acceptLabel: this.translator.instant('confirmdlg.confirm'),
            rejectLabel: this.translator.instant('confirmdlg.cancel'),
            rejectButtonStyleClass: 'p-button-outlined p-button-sm',
            acceptButtonStyleClass: 'p-button-sm',
            accept: () => {
                confirm.acceptCommand(confirm.data);
            },
            reject: () => {
                confirm.rejectCommand(confirm.data);
            }
        });
    }
}

export interface UserConfirmation {
    message: string;
    acceptCommand: Function,
    rejectCommand: Function,
    data: any;
    icon?: string,
    args?: any;
}