import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    development: string;
    url: string;
    returnUrl: string;
    urlVakaid: string;

    constructor(
    ) {
        const origin = window.location.origin;
        if (origin === 'http://vakapay.com') {
            this.development = 'localhost';
            this.urlVakaid = 'https://192.168.1.157:5000';
            this.returnUrl = 'http://192.168.1.80:4200';
            this.url = 'https://192.168.1.157:5001';
            return;
        }

        this.urlVakaid = 'https://vakaid.vakaxalab.com';
        this.returnUrl = 'https://vakapay.vakaxalab.com';
        this.url = 'https://api.vakaid.vakaxalab.com';

        // if (this.development === 'node') {
        //     this.url = 'http://localhost:4040';
        //     return;
        // }

    }
}
