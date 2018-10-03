import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private development: string;
    url: string;
    returnUrl: string;
    urlVakaid: string;

    constructor(
    ) {
        this.urlVakaid = 'http://192.168.1.185:5000';
        this.returnUrl = 'http://192.168.1.80:4200';

        if (this.development === 'node') {
            this.url = 'http://localhost:4040';
            return;
        }

        this.url = 'http://192.168.1.157:5001';
    }
}
