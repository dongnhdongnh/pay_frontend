import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';
import { Wallet } from 'model/wallet/Wallet';
import { Root } from 'component/root/root.component';
import { WalletService } from 'services/wallet/wallet.service';
import { Jsonp } from '@angular/http';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent extends Root implements OnInit {
  mAccount: Account;
  walletService: WalletService;
  wallets: Wallet[] = new Array<Wallet>();
  Coin;
  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    mAccountSerive: AccountService,
    walletService: WalletService) {
    super(titleService, route, router);
    this.mAccount = mAccountSerive.mAccount;
    this.mAccount.id = "8377a95b-79b4-4dfb-8e1e-b4833443c306";
    this.Coin = "ETH";
    this.walletService = walletService;
   
   // console.log("ACCOUNT ID: " + JSON.stringify(this.mAccount));
    this.getUserData();
  }

  async getUserData() {
    var result = await this.walletService.getAllWallet(this.mAccount);
    //  console.log("wallets: " + JSON.stringify(wallets));
    //  var _data= JSON.parse(wallets.message);
    var walletsData = JSON.parse(result.message);
    for (var i = 0; i < walletsData.length; i++) {
      console.log(walletsData[i]);
      //var _ok=JSON.parse( walletsData[i]);
      var _w = new Wallet();
      _w.attributesLower = walletsData[i];
      this.wallets.push(_w);
      console.log(_w.networkname);
    }
  }

  ngOnInit() {
  }

  public onClickWalletTab(event, name) {
    console.log(JSON.stringify(event) + name);
  }

}
