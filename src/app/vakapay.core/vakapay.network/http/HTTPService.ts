import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { DataInit } from '../model/DataInit';
var url = 'http://localhost:4040';
var dataInit: any;

var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
    }),
    withCredentials: true
};

var httpOptionsGet = {
    withCredentials: true
};

@Injectable()
export class HTTPService {
    errorMessage: any;

    constructor(private http: HttpClient) { }

    clearData() {
        dataInit = null;
    }

    //Post register to server api
    postRegister(data): Promise<any> {
        var self = this;
        console.log('loading register to server api ...');
        debugger;
        return new Promise<any>(resolve => {
            self.http.post(url + '/api/register', data, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => resolve(error)
                );
        });
    };

    //Post login to server api
    postLogin(data): Promise<any> {
        var self = this;
        console.log('loading login to server api ...');
        return new Promise<any>(resolve => {
            self.http.post(url + '/user/login', data, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => resolve(error)
                );
        });
    };

    //Find transaction
    postFindTransactionHashs(data): Promise<any> {
        var self = this;
        console.log('loading list of transaction hashs from server api ...');
        return new Promise<any>(resolve => {
            self.http.post(url + '/profile/get-transactions', data, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => resolve(error)
                );
        });
    };
    //Submit wallet
    postSubmitWallet(data): Promise<any> {
        var self = this;
        console.log('loading list of transaction hashs from server api ...');
        return new Promise<any>(resolve => {
            self.http.post(url + '/profile/submit-wallet', data, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => resolve(error)
                );
        });
    };

    //Verify KYC
    postKyc(data): Promise<any> {
        var self = this;
        console.log('loading info of kyc to server api ...');
        return new Promise<any>(resolve => {
            self.http.post(url + '/profile/verify-kyc', data, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => resolve(error)
                );
        });
    };

    getDataInit(): Promise<any> {
        var self = this;
        if (!dataInit) {
            console.log('loading dataInit from server api ...');
            dataInit = new Promise<any>(resolve => self.http.get(url + '/user/data-init', httpOptionsGet)
                .subscribe(
                    data => resolve(dataInit = data),
                    error => resolve(error)
                ));
            return dataInit;
        } else
            return dataInit;
    };

    getLogout(): Promise<any> {
        var self = this;
        console.log('logout from server api ...');
        return new Promise<any>(resolve => {
            self.http.get(url + '/user/logout', httpOptionsGet).subscribe(
                data => resolve(data),
                error => resolve(error)
            );
        });
    };
}