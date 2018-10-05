import { Injectable } from '@angular/core';
import { IpService } from 'services/system/ip.service';
const origin = window.location.origin;

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    development: string;
    url: string;
    issuer: string;
    redirectUri: string;
    silentRefreshRedirectUri: string;
    postLogoutRedirectUri: string;
    clientId: string;

    constructor() {
        IpService.getIpLAN();
        this.issuer = 'https://vakaid.vakaxalab.com';
        this.url = 'https://api.vakaid.vakaxalab.com';
        this.redirectUri = `${origin}/login`;
        this.silentRefreshRedirectUri = `${origin}/silent-refresh.html`;
        this.postLogoutRedirectUri = `${origin}/`;

        //localhost
        if (origin === 'https://localhost.com') {
            this.development = 'localhost';
            this.clientId = 'local';
            return;
        }
      
        //server
        this.clientId = 'implicit';
    }

    get returnUrl() {
        if (this.development === 'localhost') {
            const ip = `https://${localStorage.getItem('ipLAN')}:4040/`;
            console.log(`Address web local is ${ip}`)
            return ip;
        }

        return `${origin}/`;
    }
}
