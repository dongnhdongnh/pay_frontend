import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class AccountService {

    private getInfoUrl = '/api/security/get-info';
    private closeAccountUrl = '/api/security/close-account';

    constructor(private httpService: HttpService) {
    }

    getInfo() {
        let operation = 'get info security';
        let api = this.getInfoUrl;
        return this.httpService.get(operation, api, false);
    }

    closeAccount(){
        let operation = 'close account';
        let api = this.closeAccountUrl;
        return this.httpService.get(operation, api, false);
    }

}