import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { AccountService } from './../account/account.service';
// import { Account } from 'model/account/Account';

@Injectable({ providedIn: 'root' })

export class AuthService {
    jwtHelper: JwtHelperService;
    constructor() {
        this.jwtHelper = new JwtHelperService();
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (!token || token == 'null') return false;
        // Check whether the token is expired and return
        // true or false
        // let isTokenExpired = !this.jwtHelper.isTokenExpired(token || '');
        // if (isTokenExpired) {
        //     //Get account infor
        //     // var decodeInfo = this.jwtHelper.decodeToken(token);
        //     // var userInfo = decodeInfo.userInfo;
        //     // this.mAccountService.mAccount = new Account(userInfo.Email, );
        // }
        let isTokenExpired = this.jwtHelper.isTokenExpired(token || '');
        return !isTokenExpired;
    }
}