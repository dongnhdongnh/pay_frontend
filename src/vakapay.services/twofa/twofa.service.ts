import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaService {

    private getSecretUrl = '/api/twofa/enable/get-secret';
    private updateDisableUrl = '/api/twofa/disable/update';
    private requireSendCodeUrl = '/api/twofa/require-send-code-phone';
    private verifyTokenUrl = '/api/verify-code-twofa';
    private customUrl = '/api/twofa/custom';

    constructor(private httpService: HttpService) { }

    resultTest(operation) {
        return this.httpService.test(operation);
    }

    requireSendCodePhone(action: string, code: string = '') {
        let operation = 'require update status of twofa';
        let api = this.requireSendCodeUrl;
        return this.httpService.post(operation, api, { action: action, code: code }, false);
    }

    getSecret(data: any) {
        let operation = 'get secret';
        let api = this.getSecretUrl;
        return this.httpService.post(operation, api, data);
    }

    verifyToken(data: any = { code: '123456' }) {
        let operation = 'verify code with googole authentication';
        let api = this.verifyTokenUrl;
        return this.httpService.post(operation, api, data);
    }

    custom(data: any) {
        let operation = 'custom twofa';
        let api = this.customUrl;
        return this.httpService.post(operation, api, data);
    }

    disable(data: any) {
        let operation = 'disable twofa - verify code with phone';
        let api = this.updateDisableUrl;
        return this.httpService.post(operation, api, data);
    }
}