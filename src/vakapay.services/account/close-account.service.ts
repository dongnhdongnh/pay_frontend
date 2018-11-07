import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class CloseAccountService {

    private closeAccountUrl = '/api/security/close-account';
    private verifyWithPasswordUrl = '/api/close-account/verify-with-password';
    private verifyWithPhoneUrl = '/api/close-account/verify-with-phone';
    private requireSendCodePhoneUrl = '/api/close-account/require-send-code-phone';

    constructor(private httpService: HttpService) {
    }

    verifyWithPassword(data: any) {
        let operation = 'verify close account with password';
        let api = this.verifyWithPasswordUrl;
        return this.httpService.post(operation, api, data);
    }

    requireSendCodePhone() {
        let operation = 'require server to send code to phone to verify close account';
        let api = this.requireSendCodePhoneUrl;
        return this.httpService.post(operation, api, null, false);
    }

    verifyCodeWithPhone(data: any) {
        let operation = 'verify close account with phone';
        let api = this.verifyWithPhoneUrl;
        return this.httpService.post(operation, api, data);
    }

    closeAccount() {
        let operation = 'close account';
        let api = this.closeAccountUrl;
        return this.httpService.get(operation, api);
    }

}