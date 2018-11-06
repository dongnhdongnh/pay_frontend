import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
})

export class TwoFactorAuthenticationComponent {

  mAccount: Account;

  constructor(accountService: AccountService) {
    this.mAccount = accountService.mAccount;
  }
}
