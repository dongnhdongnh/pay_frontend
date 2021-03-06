import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class TwofaOptionService {

    private updateTwofaVerifyOptionsUrl = '/api/twofa/option/update';
    private requireSendCodePhoneUrl = '/api/twofa/option/require-send-code-phone';

    constructor(private httpService: HttpService) { }

    requireSendCodePhone() {
        let operation = 'require server to send code to phone to verify change option twofa';
        let api = this.requireSendCodePhoneUrl;
        return this.httpService.post(operation, api, null, false);
    }

    update(data: any) {
        let operation = 'twofa - update options verify';
        let api = this.updateTwofaVerifyOptionsUrl;
        return this.httpService.post(operation, api, data);
    }
}