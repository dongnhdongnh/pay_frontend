import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaService {

    private verifyCodeWithPhoneUrl = '/api/twofa/enable/verify-code-with-phone';
    private requiredSendCodePhone = '/api/twofa/enable/require-send-code-phone';
    private updateTwofaVerifyOptionsUrl = '/api/twofa/update-verify-options';
    private test = true;

    constructor(private httpService: HttpService) { }

    resultTest(operation) {
        return this.httpService.test(operation);
    }

    verifyCodeWithPhone(data: any) {
        let operation = 'twofa - verify code with phone';
        let api = this.verifyCodeWithPhoneUrl;
        if (this.test) return this.resultTest(operation);
        return this.httpService.post(operation, api, data);
    }

    updateTwofaVerifyOptions(data: any) {
        let operation = 'twofa - update options verify';
        let api = this.updateTwofaVerifyOptionsUrl;
        if (this.test) return this.resultTest(operation);
        return this.httpService.post(operation, api, data);
    }
}