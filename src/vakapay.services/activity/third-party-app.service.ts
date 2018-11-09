import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ThirdPartyApp, ListThirdPartyApp } from 'model/activity/ThirdPartyApp';
import { Utility } from 'utility/Utility';

@Injectable({ providedIn: 'root' })
export class ThirdPartyAppService {
    public list: ThirdPartyApp[];
    private test = true;
    isError: boolean = false;
    isLoading: boolean = false;

    constructor(private httpService: HttpService) {
    }

    async getList(offset = 0, limit = 8) {
        // try {
        //     this.isLoading = true;
        //     let operation = 'get list third party services';
        //     let api = `/api/activity/web-session/get-list?offset=${offset}&limit=${limit}`;
        //     let result = await this.httpService.get(operation, api, false);
        //     this.isLoading = false;

        //     if (Utility.isError(result)) {
        //         this.isError = true;
        //         return;
        //     }

        //     this.isError = false;
        //     var list = new ListThirdPartyApp();
        //     list.list = result.data;
        //     list.format();
        //     this.list = list.list;
        // } catch (error) {
        //     this.isError = true;
        //     this.isLoading = false;
        // }
    }

    refresh() {
        this.getList();
    }
}