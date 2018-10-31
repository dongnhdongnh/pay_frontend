import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ApiKey } from 'model/api-access/ApiKey';
import { Utility } from 'utility/Utility';
import { PaginationService } from 'services/pagination.service';

@Injectable({ providedIn: 'root' })
export class ApiKeyService extends PaginationService {

    private createUrl = '/api/api-access/create';
    private getUrl = '/api/api-key/get';
    private deleteUrl = '/api/api-key/delete';
    private disableUrl = '/api/api-key/disable';
    private enableUrl = '/api/api-key/enable';
    private editUrl = '/api/api-key/edit';
    private getListUrl = '/api/api-access/get-list-api-access';
    public list: ApiKey[];
    public total: number = 0;
    public offset: number = 0;
    public limit: number = 8;

    public currentId: string = '';

    //status
    isError: boolean = false;
    isLoading: boolean = false;

    constructor(private httpService: HttpService) { super(); }

    create(data: any) {
        let operation = 'create new api key';
        let api = this.createUrl;
        return this.httpService.post(operation, api, data);
    }

    get(data: any) {
        let operation = 'get api key by id';
        let api = this.getUrl;
        return this.httpService.post(operation, api, data);
    }

    edit(data: any) {
        let operation = 'edit api key by id';
        let api = this.editUrl;
        return this.httpService.post(operation, api, data);
    }

    delete(data: any) {
        let operation = 'delete api key by id';
        let api = this.deleteUrl;
        return this.httpService.post(operation, api, data);
    }

    disable(data: any) {
        let operation = 'disable api key by id';
        let api = this.disableUrl;
        return this.httpService.post(operation, api, data);
    }

    enable(data: any) {
        let operation = 'enable api key by id';
        let api = this.enableUrl;
        return this.httpService.post(operation, api, data);
    }

    async getList() {
        try {
            this.isLoading = true;
            let operation = 'get list api key';
            let api = `${this.getListUrl}?offset=${this.offset}&limit=${this.limit}`;
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }

            this.isError = false;
            let list = result.data.List;
            this.list = list.map(element => {
                let model = new ApiKey();
                model.attributes = element;
                return model;
            });
            this.list = this.list.sort((a, b) => b.updatedAt - a.updatedAt);
            this.total = result.data.Total;
            return;
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    }

    refresh() {
        return this.getList();
    }
}