import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class LockScreenService {

    private updateLockScreenUrl = '/api/security/lock-screen/update';
    private unlockUrl = '/api/security/lock-screen/unlock';
    private requireSendCodePhoneUrl = '/api/security/lock-screen/require-send-code-phone';

    constructor(private httpService: HttpService) {
    }

    requireSendCodePhone() {
        let operation = 'require server to send code to phone to verify update lock screen';
        let api = this.requireSendCodePhoneUrl;
        return this.httpService.post(operation, api, null, false);
    }

    update(data: any) {
        let operation = 'update lock screen';
        let api = this.updateLockScreenUrl;
        return this.httpService.post(operation, api, data);
    }

    unlock(data: any) {
        let operation = 'unlock screen';
        let api = this.unlockUrl;
        return this.httpService.post(operation, api, data);
    }

}