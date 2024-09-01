import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class MockSsoService {
    initializeSSO() {
    }
    isLoggedIn() {
        return true;
    }

    login(options: any, company?: string) {

    }

    logout(url: string) {
    }

    getToken(): Promise<string> {
        return Promise.resolve("mock_token");
    }

    getCookieValue(name: string) {
        return "mock_value_" + name; 
    }
}