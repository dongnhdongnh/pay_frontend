import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LockGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}