import { Component } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';


@Component({
  selector: 'app-enable-api-key',
  templateUrl: './enable-api-key.component.html',
  styleUrls: ['./enable-api-key.component.css']
})
export class EnableApiKeyComponent {
  //model
  mAccount: Account;

  constructor(
    private accountService: AccountService,
  ) {
    this.mAccount = accountService.mAccount;
  }
}