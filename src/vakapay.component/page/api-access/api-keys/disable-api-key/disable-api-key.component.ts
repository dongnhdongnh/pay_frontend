import { Component } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Component({
  selector: 'app-disable-api-key',
  templateUrl: './disable-api-key.component.html',
  styleUrls: ['./disable-api-key.component.css']
})
export class DisableApiKeyComponent {
  //model
  mAccount: Account;

  constructor(
    private accountService: AccountService,
  ) {
    this.mAccount = accountService.mAccount;
  }
}
