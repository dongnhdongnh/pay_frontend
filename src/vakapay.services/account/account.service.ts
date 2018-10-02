import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AccountService {
    public mAccount: any;
    constructor() {
        this.mAccount = null;
    }
}