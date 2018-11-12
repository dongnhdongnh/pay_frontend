import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { Injectable } from '@angular/core';
import { Utility } from 'utility/Utility';

var listCurrency = [
    ['USD', 'United States Dollar (USD)'],
    ['VND', 'Vietnamese Ðong (VND)']
];
var listSymbol = [
    ['USD', '$'],
    ['VND', '₫']
];

export class Currency {
    key: string;
    name: string;
    disabled: boolean;

    constructor(key, name, disabled = false) {
        this.key = key;
        this.name = name;
        this.disabled = disabled;
    }

    static getListCurrency(): Currency[] {
        return listCurrency.map(x => new Currency(x[0], x[1], Boolean(x[2])));
    }
}

@Injectable({ providedIn: 'root' })
export class CurrentCurrency {
    mAccount: Account;
    private apiUrl = '';
    configService: ConfigService;
    symbol = '$';
    exchangeRate = 1;

    constructor(
        private accountService: AccountService, private httpService: HttpService,
        configService: ConfigService
    ) {
        this.configService = configService;
        this.mAccount = accountService.mAccount;
        this.apiUrl = this.configService.urlApi;
        this.getExchangeRate();
    }

    public async getExchangeRate() {
        while (!this.mAccount.currencyKey) {
            await Utility.sleep(500);
        }
        var currencyId = this.mAccount.currencyKey;
        listSymbol.forEach(element => {
            if (currencyId == element[0]) {
                this.symbol = element[1];
            }
        });
        if (currencyId === 'USD') {
            return;
        }
        this.exchangeRate = Number(await this.getData(currencyId));
    }

    public async getData(currencySymbol = '') {
        var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + '/api/currency/' + currencySymbol);
        if (apiData && apiData.data) {
            return apiData.data;
        }
        return null;
    }
}