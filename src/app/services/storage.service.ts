import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageServie {
    constructor() {
        const comp = this.getData('_company');
        this.company = comp ? comp : 'default';
    }
    company: string;
    loggedIn: boolean = false;

    saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getData(key: string) {
        return localStorage.getItem(key);
    }
}