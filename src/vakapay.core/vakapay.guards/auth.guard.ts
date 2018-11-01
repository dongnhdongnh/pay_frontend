import { Utility } from 'utility/Utility';
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

        if (this.accountService.isCheckLock === false) this.lockScreen();
        return true;
    }

    async lockScreen() {
        this.router.events.subscribe((res) => {
            let PATH = this.router.url;
            this.accountService.currentRouter = PATH;
        })

        while (this.accountService.isGet === false) {
            await Utility.sleep(100);
        }

        if (this.accountService.mAccount.isLockScreen === 1) {
            this.router.navigate(['account-is-lock']);
        }

        return;
    }
}