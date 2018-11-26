import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
    isLoading: boolean = false;

    private newReportUrl = '/api/wallet/Report';

    constructor(private httpService: HttpService) { }

    async new(data: any) {
        try {
            let operation = 'create new report';
            let api = this.newReportUrl;
            return this.httpService.post(operation, api, data);
        } catch (error) {
            console.log(error);
        }
    }
}