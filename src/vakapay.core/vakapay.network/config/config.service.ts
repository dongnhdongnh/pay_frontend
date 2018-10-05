import { Injectable } from '@angular/core';
import { IpService } from 'services/system/ip.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    development: string;
    url: string;
    urlVakaid: string;

    constructor() {
        IpService.getIpLAN();
        const origin = window.location.origin;
        if (origin === 'https://vakapay.com') {
            this.development = 'localhost';
            this.urlVakaid = 'https://192.168.1.157:5000';
            this.url = 'https://192.168.1.157:5001';
            return;
        }

        this.urlVakaid = 'https://vakaid.vakaxalab.com';
        this.url = 'https://api.vakaid.vakaxalab.com';

        // if (this.development === 'node') {
        //     this.url = 'http://localhost:4040';
        //     return;
        // }

    }

    get returnUrl(){
        if (this.development === 'localhost'){
            const ip = `https://${localStorage.getItem('ipLAN')}:4040`;
            console.log(`Address web local is ${ip}`)
            return ip;
        }

        return 'https://vakapay.vakaxalab.com';
    }
}
