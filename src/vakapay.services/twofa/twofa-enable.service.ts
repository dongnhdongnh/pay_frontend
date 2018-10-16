import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaEnableService {

    private updateUrl = '/api/twofa/enable/update';
    private requireSendCodePhoneUrl = '/api/twofa/enable/require-send-code-phone';
    private test = true;

    constructor(private httpService: HttpService) { }

    resultTest(operation) {
        return this.httpService.test(operation);
    }

    requireSendCodePhone() {
        let operation = 'require server to send code to phone to verify close account';
        let api = this.requireSendCodePhoneUrl;
        // if (this.test) return this.resultTest(operation);
        return this.httpService.post(operation, api, null, false);
    }

    update(data: any) {
        let operation = 'twofa - verify code with phone';
        let api = this.updateUrl;
        if (this.test) return this.resultTest(operation);
        return this.httpService.post(operation, api, data);
    }
}