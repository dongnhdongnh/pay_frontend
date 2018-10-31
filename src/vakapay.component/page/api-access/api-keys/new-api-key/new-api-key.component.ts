import { Component } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Component({
  selector: 'app-new-api-key',
  templateUrl: './new-api-key.component.html',
  styleUrls: ['./new-api-key.component.css']
})

export class NewApiKeyComponent {
  //model
  mAccount: Account;

  constructor(
    private accountService: AccountService,
  ) {
    this.mAccount = accountService.mAccount;
  }
}