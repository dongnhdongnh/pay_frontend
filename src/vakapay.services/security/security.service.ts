import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class SecurityService {

    private getInfoUrl = '/api/security/get-info';

    constructor(private httpService: HttpService) {
    }

    getInfo() {
        let operation = 'get info security';
        let api = this.getInfoUrl;
        return this.httpService.get(operation, api, false);
    }
}