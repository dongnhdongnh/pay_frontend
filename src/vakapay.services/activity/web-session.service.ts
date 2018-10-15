import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { WebSession, ListWebSession } from 'model/activity/WebSession';
import { Utility } from 'utility/Utility';

@Injectable({ providedIn: 'root' })
export class WebSessionService {
    public deleteUrl = '/api/activity/web-session/delete';
    public list: WebSession[];
    private test = true;
    isError: boolean = false;
    isLoading: boolean = false;

    constructor(private httpService: HttpService) {
    }

    async getList(offset = 0, limit = 8) {
        try {
            this.isLoading = true;
            let operation = 'get list web sessions';
            let api = `/api/activity/web-session/get-list?offset=${offset}&limit=${limit}`;
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }

            this.isError = false;
            var list = new ListWebSession();
            list.list = result.data;
            list.format();
            this.list = list.list;
            return;
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    }

    delete(data: any) {
        let operation = 'delete web session';
        let api = this.deleteUrl;
        return this.httpService.post(operation, api, data);
    }

    refresh() {
        this.getList();
    }
}