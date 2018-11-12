import { ApiService } from 'network/http/api.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class RateService {
    private url = 'https://free.currencyconverterapi.com';
    private getCurrenciesUrl = '/api/v6/currencies';  // URL to web api

    constructor(
        private httpService: ApiService,
    ) { }

    /** POST: register for user to the server */
    getCurrencies(): Promise<any> {
        let operation = 'get currencies';
        let api = new URL(this.getCurrenciesUrl, this.url).href;
        return this.httpService.requestGet(operation, api);
    }

}
