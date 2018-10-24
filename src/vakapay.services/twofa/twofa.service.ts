import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaService {

    private updateEnableUrl = '/api/twofa/enable/update';
    private updateDisableUrl = '/api/twofa/disable/update';
    private requireSendCodePhoneEnableUrl = '/api/twofa/enable/require-send-code-phone';
    private requireSendCodePhoneDisableUrl = '/api/twofa/disable/require-send-code-phone';

    constructor(private httpService: HttpService) { }

    resultTest(operation) {
        return this.httpService.test(operation);
    }

    requireSendCodePhone(isEnable = true) {
        let operation = 'require update status of twofa';
        let api = isEnable ? this.requireSendCodePhoneEnableUrl : this.requireSendCodePhoneDisableUrl;
        return this.httpService.post(operation, api, null, false);
    }

    enable(data: any) {
        let operation = 'enable twofa - verify code with phone';
        let api = this.updateEnableUrl;
        return this.httpService.post(operation, api, data);
    }

    disable(data: any) {
        let operation = 'disable twofa - verify code with phone';
        let api = this.updateDisableUrl;
        return this.httpService.post(operation, api, data);
    }
}