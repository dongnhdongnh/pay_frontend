import { Utility } from 'utility/Utility';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class SecurityService {

    private getInfoUrl = '/api/security/get-info';
    isEnableTwofa: boolean = false;
    twofaOption: number = 1;

    constructor(private httpService: HttpService) {
        this.isEnableTwofa = false;
        this.twofaOption = 1;
    }

    async getInfo() {
        let operation = 'get info security';
        let api = this.getInfoUrl;
        let result = await this.httpService.get(operation, api, false);
        if (Utility.isError(result)) return;
        let data = result.data;
        this.isEnableTwofa = data.isEnableTwofa;
        this.twofaOption = data.twofaOption;
    }
}