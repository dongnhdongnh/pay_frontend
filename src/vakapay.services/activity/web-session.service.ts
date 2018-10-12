import { ResultObject } from 'model/result/ResultObject';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { WebSession, ListWebSession } from 'model/activity/WebSession';
import { Utility } from 'utility/Utility';

@Injectable({ providedIn: 'root' })
export class WebSessionService {
    listWebSession: WebSession[];
    private test = true;
    error: boolean;
    isLoading: boolean;

    constructor(private httpService: HttpService) {
    }

    async getList(offset = 0, limit = 8) {
        this.isLoading = true;
        this.error = false;
        let operation = 'get list web sessions';
        let api = `/api/web-session/get-list?offset=${offset}&limit=${limit}`;
        let result = null;

        if (this.test) {
            result = new ResultObject({
                status: 'success',
                message: `Harcode operator ${operation}`,
                data: {
                    list: [
                        {
                            id: '323-323-fds',
                            updatedAt: 1539245677,
                            browser: 'Chrome',
                            userIp: '13.231.31.213',
                            address: 'Ha Noi, Viet Nam',
                            current: 1,
                        }
                    ]
                }
            });
        } else {
            result = await this.httpService.get(operation, api, false);
            if (Utility.isError(result)) this.error = true;
        }

        this.isLoading = false;
        if (this.error) return;

        var listWebSession = new ListWebSession();
        listWebSession.attributes = result.data;
        listWebSession.format();
        this.listWebSession = listWebSession.list;
    }
}