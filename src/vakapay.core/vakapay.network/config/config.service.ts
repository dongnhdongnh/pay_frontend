import { Injectable } from '@angular/core';
import { IpService } from 'services/system/ip.service';
const origin = window.location.origin;

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    development: string;
    urlApi: string;
    issuer: string;
    redirectUri: string;
    silentRefreshRedirectUri: string;
    postLogoutRedirectUri: string;
    clientId: string;
    imageUrl: string;

    constructor() {
        IpService.getIpLAN();
        this.issuer = 'https://vakaid.vakaxalab.com';
        this.urlApi = 'https://api.vakaid.vakaxalab.com';
        this.redirectUri = `${origin}/login`;
        this.silentRefreshRedirectUri = `${origin}/silent-refresh.html`;
        this.postLogoutRedirectUri = `${origin}/`;
        this.imageUrl = './src/assets/images';

        //localhost
        if (origin === 'https://localhost:4040') {
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
