import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { PortalError } from "../../../model/common.model";

@Injectable({providedIn: 'root'})
export class MessageDlgService {
    messages: UiMessage[] = [];
    constructor(private msgService: MessageService, private ts: TranslateService) {}

    /**
     * Use this to just log any information.
     * @param code 
     * @param message 
     */
    logMessage(code: string, message: string) {
        this.pushMessage(TYPE.message, '' + code, message);
    }

    showErrorMsg(msg: string, summary?: string) {
        this.pushMessage(TYPE.error, '' + summary || 'na', msg);
        this.msgService.add({
            severity: 'error',
            summary: this.ts.instant(summary || 'Error Encountered'),
            detail: this.ts.instant(msg)
        });
    }

    showError(err: any) {
        const error: PortalError = this.getMsgAndCode(err);
        this.pushMessage(TYPE.error, '' + error.code, error.message);
        this.msgService.add({
            severity: 'error',
            summary: this.ts.instant('Error Encountered'),
            detail: this.ts.instant('' + error.code, [error.code])
        });
    }

    showInfo(msg: string, summary?: string) {
        this.pushMessage(TYPE.info, summary || 'na', msg);
        this.msgService.add({
            severity: 'info',
            summary: this.ts.instant(summary || 'Information'),
            detail: this.ts.instant(msg)
        });
    }
    showSuccess(msg: string, summary?: string) {
        this.pushMessage(TYPE.success, summary || 'na', msg);
        this.msgService.add({
            severity: 'success',
            summary: this.ts.instant(summary || 'Successfully completed'),
            detail: this.ts.instant(msg)});
    }

    getMsgAndCode(err: any) {
        if (err.error && err.error.code) {
            return err.error;
        } else {
            if (err.status) {
                return {
                    code: "http_" + err.status,
                    message: 'error.encountered'
                }    
            }
            return {
                code: 1,
                message: 'unknown error'
            }
        }
    }

    pushMessage(type: string, code: string, message: string) {
        if (this.messages.length > 100) {
            this.messages = this.messages.splice(0, 1);
        }
        this.messages.push({
            type: type,
            code: code,
            message: message
        });
    }
}

class UiMessage {
    type?: string;
    code?: string;
    message?: string;
}
enum TYPE {
    error = 'err',
    info = 'info',
    success = 'success',
    message = 'msg'
}