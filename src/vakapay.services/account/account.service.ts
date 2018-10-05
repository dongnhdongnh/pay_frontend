import { ConfigService } from 'network/config/config.service';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
import { Account } from 'model/account/Account';
import { PathService } from 'services/path/path.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private getInfoUrl = '/api/user/get-info';  // URL to web api
    public mAccount: Account;
    configService: ConfigService;

    constructor(private httpService: HttpService, configService: ConfigService) {
        this.mAccount = null;
        this.configService = configService;
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
            if (result.data.avatar) {
                this.mAccount.avatar = PathService.join(this.configService.urlApi, this.mAccount.avatar);
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
}