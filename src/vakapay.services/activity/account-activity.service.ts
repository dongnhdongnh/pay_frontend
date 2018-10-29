import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { AccountActivity, ListAccountActivity } from 'model/activity/AccountActivity';
import { Utility } from 'utility/Utility';

@Injectable({ providedIn: 'root' })
export class AccountActivityService {
    public list: AccountActivity[];
    isError: boolean = false;
    isLoading: boolean = false;

    constructor(private httpService: HttpService) {
    }

    async getList(offset = 0, limit = 8) {
        try {
            this.isLoading = true;
            let operation = 'get list account activity';
            let api = `/api/activity/account-activity/get-list?offset=${offset}&limit=${limit}`;
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }

            this.isError = false;
            var list = new ListAccountActivity();
            list.list = result.data;
            list.format();
            this.list = list.list;
            return;
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    }

    refresh() {
        this.getList();
    }
}