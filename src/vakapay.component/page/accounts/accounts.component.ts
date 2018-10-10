import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';
import { Root } from 'component/root/root.component';
import { WalletService } from 'services/wallet/wallet.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent extends Root implements OnInit {
  mAccount: Account;
  coin;
  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    mAccountSerive: AccountService,
    walletService:WalletService) {
    super(titleService, route, router);
    this.mAccount = mAccountSerive.mAccount;
    this.coin = "ETH";
    console.log("ACCOUNT ID: " + this.mAccount.id);
    //walletService.getWalletInfor();
  }

  ngOnInit() {
  }

  public onClickWalletTab(event,name) {
    console.log(JSON.stringify(event)+ name);
  }

}
