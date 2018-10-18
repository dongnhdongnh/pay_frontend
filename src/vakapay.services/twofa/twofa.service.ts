import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaService {

    private updateEnableUrl = '/api/twofa/enable/update';
    private verifySmsUrl = '/api/twofa/enable/verify-code-sms';
    private updateDisableUrl = '/api/twofa/disable/update';
    private requireSendCodePhoneEnableUrl = '/api/twofa/enable/require-send-code-phone';
    private requireSendCodePhoneDisableUrl = '/api/twofa/disable/require-send-code-phone';
    private generateSecretUrl = '/api/get-twofa-secret';
    private test: boolean = true;

    constructor(private httpService: HttpService) { }

    resultTest(operation) {
        return this.httpService.test(operation);
    }

    requireSendCodePhone(isEnable = true) {
        let operation = 'require update status of twofa';
        let api = isEnable ? this.requireSendCodePhoneEnableUrl : this.requireSendCodePhoneDisableUrl;
        return this.httpService.post(operation, api, null, false);
    }

    verifySms(data: any) {
        let operation = 'verify code with phone';
        let api = this.verifySmsUrl;
        return this.httpService.post(operation, api, data);
    }

    enable(data: any) {
        let operation = 'enable twofa';
        let api = this.updateEnableUrl;
        return this.httpService.post(operation, api, data);
    }

    disable(data: any) {
        let operation = 'disable twofa - verify code with phone';
        let api = this.updateDisableUrl;
        return this.httpService.post(operation, api, data);
    }

    // getSecret(data: any) {
    //     let operation = 'generate twofa secret';
    //     let api = this.generateSecretUrl;

    //     if (this.test) {
    //         return this.httpService.requestGet(operation, new URL(api, 'http://localhost:4444').href, data);
    //     }

    //     return this.httpService.get(operation, api, data);
    // }
}