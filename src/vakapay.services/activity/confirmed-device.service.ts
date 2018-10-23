import { ConfirmedDevice, ListConfirmedDevice } from 'model/activity/ConfirmedDevice';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';

@Injectable({ providedIn: 'root' })
export class ConfirmedDeviceService {
    public list: ConfirmedDevice[];
    public deleteUrl = '/api/activity/device-history/delete';
    private test = true;
    isError: boolean = false;
    isLoading: boolean = false;

    constructor(private httpService: HttpService) {
    }

    async getList(offset = 0, limit = 8) {
        try {
            this.isLoading = true;
            let operation = 'get list confirmed device';
            let api = `/api/activity/device-history/get-list?offset=${offset}&limit=${limit}`;
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }

            this.isError = false;
            var list = new ListConfirmedDevice();
            list.list = result.data;
            list.format();
            this.list = list.list;
            console.log(this.list)
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    }

    refresh() {
        this.getList();
    }

    delete(data: any) {
        let operation = 'delete web session';
        let api = this.deleteUrl;
        return this.httpService.post(operation, api, data);
    }
}