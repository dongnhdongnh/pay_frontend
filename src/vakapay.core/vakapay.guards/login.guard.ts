import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }
}