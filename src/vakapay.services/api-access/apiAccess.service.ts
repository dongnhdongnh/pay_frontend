import { ApiAccess } from './../../vakapay.model/api-access/ApiAccess';
import { Utility } from 'utility/Utility';
import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class ApiAccessService {

    private getInfoUrl = '/api/api-access/get-info';

    public apiAccess: ApiAccess;

    constructor(private httpService: HttpService) {
        this.apiAccess = new ApiAccess();
    }

    async getInfo() {
        try {
            let operation = 'get info api access';
            let api = this.getInfoUrl;
            let result = await this.httpService.get(operation, api, false);
            if (Utility.isError(result)) {
                throw new Error('Get info api access error');
            }

            this.apiAccess.attributes = result.data;
            console.log(this.apiAccess);
            return;
        } catch (error) {
            console.log(JSON.stringify(error.message));
            await Utility.sleep(5000);
            this.getInfo();
        }
    }
}