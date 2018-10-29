import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Action } from 'model/Action';

@Injectable({ providedIn: 'root' })
export class TwofaService {

    private updateEnableUrl = '/api/twofa/enable/update';
    private verifySmsUrl = '/api/twofa/enable/verify-code-sms';
    private updateDisableUrl = '/api/twofa/disable/update';
    private requireSendCodeUrl = '/api/twofa/require-send-code-phone';
    private verifyTokenUrl = '/api/verify-code-twofa';

    constructor(private httpService: HttpService) { }

    resultTest(operation) {
        return this.httpService.test(operation);
    }

    requireSendCodePhone(isEnable = true) {
        let operation = 'require update status of twofa';
        let api = this.requireSendCodeUrl;
        return this.httpService.post(
            operation, api,
            { action: isEnable ? Action.TWOFA_ENABLE : Action.TWOFA_DISABLE }
            , false);
    }

    verifySms(data: any) {
        let operation = 'verify code with phone';
        let api = this.verifySmsUrl;
        return this.httpService.post(operation, api, data);
    }

    verifyToken(data: any = { code: '123456' }) {
        let operation = 'verify code with googole authentication';
        let api = this.verifyTokenUrl;
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
}