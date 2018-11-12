import { Component } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Component({
  selector: 'app-edit-api-key',
  templateUrl: './edit-api-key.component.html',
  styleUrls: ['./edit-api-key.component.css']
})
export class EditApiKeyComponent {
  //model
  mAccount: Account;

  constructor(
    private accountService: AccountService,
  ) {
    this.mAccount = accountService.mAccount;
  }
}
