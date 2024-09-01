import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class PlatformService {
    constructor() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
    }

    getWindowDims() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
    }
    windowResized() {
        this.getWindowDims();
    }

    getHeightFor(offset: number) {
        if (this.windowHeight < offset) {
            return 200; // Minimum Height
        }
        return this.windowHeight - offset;
    }

    windowHeight: number;
    windowWidth: number;
}