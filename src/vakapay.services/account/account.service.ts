import { ConfigService } from 'network/config/config.service';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
import { Account } from 'model/account/Account';

@Injectable({ providedIn: 'root' })
export class AccountService {

    private getInfoUrl = '/api/user/get-info';
    private updateProfileUrl = '/api/user/update-profile';

    public mAccount: Account;
    private urlApi: string;

    constructor(private httpService: HttpService, configService: ConfigService) {
        this.mAccount = new Account();
        this.urlApi = configService.urlApi;
    }

    updateProfile(data: any) {
        let operation = 'update profile';
        let api = this.updateProfileUrl;
        return this.httpService.post(operation, api, data);
    }

    async getInfo() {
        try {
            let operation = 'get info user';
            let api = this.getInfoUrl;
            let result = await this.httpService.get(operation, api, false);
            if (Utility.isError(result)) {
                console.log(result.message);
                return;
            }

            this.mAccount.attributes = result.data;
            if (result.data.avatar || result.data.Avatar) {
                this.mAccount.avatar = new URL(this.mAccount.avatar, this.urlApi).href;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

}