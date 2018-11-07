import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Address, ListAddress } from 'model/tools/Address';
import { Utility } from 'utility/Utility';
import { PaginationService } from 'services/pagination.service';

@Injectable({ providedIn: 'root' })
export class AddressToolsService extends PaginationService {
    public list: Address[];
    public infoAddress: Address;

    isError: boolean = false;
    isLoading: boolean = false;
    currentNetwork = 'Bitcoin';

    private deleteUrl = '/api/activity/account-activity/delete';

    constructor(private httpService: HttpService) {
        super();
        
    }

    delete(data: any) {
        let operation = 'delete activity of account';
        let api = this.deleteUrl;
        return this.httpService.post(operation, api, data);
    }

    async getList(networkName, filter = null) {
        try {
            this.currentNetwork = networkName;
            this.isLoading = true;
            let operation = 'get list address by network';
            let api = `/api/tools/get-addresses?networkName=${networkName}&offset=${this.offset}&limit=${this.limit}`;
            if(filter != null ){
                api += `&filter=${filter}`;
            }
            let result = await this.httpService.get(operation, api, false);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }
           
            this.isError = false;
            var list = new ListAddress();
            
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

    async updateAddress(data : any) {
        try {
           
            this.isLoading = true;
            let operation = 'get list address by network';
            let api = `/api/tools/update-addresses-info`;
            
            let result = await this.httpService.post(operation, api, data);
            this.isLoading = false;
           
            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }
            
            this.isError = false;
            
            return;
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    }

    async getAddressInfo(data : any) {
        try {
           
            this.isLoading = true;
            let operation = 'get list address by network';
            let api = `/api/tools/get-addresses-info`;
            
            let result = await this.httpService.post(operation, api, data);
            this.isLoading = false;

            if (Utility.isError(result)) {
                this.isError = true;
                return;
            }
            
            this.infoAddress.attributes = result.data;
            
            this.isError = false;
            
            
            return;
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    }
    
    refresh() {
        this.getList(this.currentNetwork);
    }
    
}