import { Component } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Component({
  selector: 'app-delete-api-key',
  templateUrl: './delete-api-key.component.html',
  styleUrls: ['./delete-api-key.component.css']
})
export class DeleteApiKeyComponent {
  //model
  mAccount: Account;

  constructor(
    private accountService: AccountService,
  ) {
    this.mAccount = accountService.mAccount;
  }

}
