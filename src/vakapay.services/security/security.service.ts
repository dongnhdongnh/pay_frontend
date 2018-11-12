import { Utility } from 'utility/Utility';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class SecurityService {
    isLoading: boolean = true;

    private getInfoUrl = '/api/security/get-info';
    isEnableTwofa: boolean = false;
    twofaOption: string = '1';

    constructor(private httpService: HttpService) { }

    async getInfo() {
        try {
            this.isLoading = true;
            let operation = 'get info security';
            let api = this.getInfoUrl;
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;
            if (Utility.isError(result)) return;
            let data = result.data;
            this.isEnableTwofa = data.isEnableTwofa;
            this.twofaOption = String(data.twofaOption);
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }
}