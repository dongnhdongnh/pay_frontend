import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaService {

    private verifyCodeWithPhoneUrl = '/api/twofa/enable/verify-code-with-phone';
    private updateTwofaVerifyOptionsUrl = '/api/twofa/update-verify-options';
    private test = true;

    constructor(private httpService: HttpService) { }

    verifyCodeWithPhone(data: any) {
        if (this.test) return this.httpService.resultTest;
        let operation = 'twofa - verify code with phone';
        let api = this.verifyCodeWithPhoneUrl;
        return this.httpService.post(operation, api, data);
    }

    updateTwofaVerifyOptions(data: any) {
        if (this.test) return this.httpService.resultTest;
        let operation = 'twofa - update options verify';
        let api = this.updateTwofaVerifyOptionsUrl;
        return this.httpService.post(operation, api, data);
    }
}