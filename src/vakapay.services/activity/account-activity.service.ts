import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { AccountActivity, ListAccountActivity } from 'model/activity/AccountActivity';
import { Utility } from 'utility/Utility';
import { PaginationService } from 'services/pagination.service';

@Injectable({ providedIn: 'root' })
export class AccountActivityService extends PaginationService {
    public list: AccountActivity[];
    isError: boolean = false;
    isLoading: boolean = false;
    public total: number = 0;
    public offset: number = 0;
    public limit: number = 8;

    constructor(private httpService: HttpService) {
        super();
    }

    async getList() {
        try {
            this.isLoading = true;
            let operation = 'get list account activity';
            let api = `/api/activity/account-activity/get-list?offset=${this.offset}&limit=${this.limit}`;
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }
            this.isError = false;
            var list = new ListAccountActivity();
            list.list = result.data.List;
            list.format();
            this.total = result.data.Total;
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