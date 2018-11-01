import { Component } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.css']
})
export class LockScreenConfigComponent {
  //model
  mAccount: Account;

  constructor(
    private accountService: AccountService,
  ) {
    this.mAccount = accountService.mAccount;
  }
}