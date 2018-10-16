import { AccountService } from 'services/account/account.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private accountService: AccountService,
        private router: Router) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }

        if (this.accountService.mAccount.isLock !== 0) {
            this.router.navigate(['account-is-lock']);
            return false;
        }

        return true;
    }
}