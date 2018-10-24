import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Injectable({ providedIn: 'root' })

export class AuthService {
    jwtHelper: JwtHelperService;
    mAccountService: any;
    constructor(mAccountService: AccountService) {
        this.jwtHelper = new JwtHelperService();
        this.mAccountService = mAccountService;
    }

    isAuthenticated(): boolean {
    //    return true;
        const token = localStorage.getItem('token');
        if (!token || token == 'null') return false;
        // Check whether the token is expired and return
        // true or false
        let isTokenExpired = this.jwtHelper.isTokenExpired(token || '');
        
        //Get account infor
        if (!isTokenExpired && !this.mAccountService.mAccount) {
            var decodeInfo = this.jwtHelper.decodeToken(token);
            var userInfo = JSON.parse(decodeInfo.userInfo);
            this.mAccountService.mAccount = new Account();
            this.mAccountService.mAccount.attributes = userInfo;
        }

        return !isTokenExpired;
    }
}