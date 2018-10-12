import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';
import { Wallet } from 'model/wallet/Wallet';
import { Root } from 'component/root/root.component';
import { WalletService } from 'services/wallet/wallet.service';
import { Jsonp } from '@angular/http';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent extends Root implements OnInit {
  mAccount: Account;
  walletService: WalletService;
  walletsData: any;
  wallet_current: any;
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
    this.walletsData = JSON.parse(result.message);
    for (var i = 0; i < this.walletsData.length; i++) {
      console.log(this.walletsData[i]);
      // var _w = new Wallet();
      // _w.attributesLower = this.walletsData[i];
      // this.wallets.push(_w);
      // console.log(_w.networkname);
    }
    await this.getHistory(this.walletsData[0]);
  }

  async getHistory(wallet) {
    try {
      if (wallet == null)
        return;
      this.wallet_current = wallet;
      let walletSearch: any = {};
      walletSearch.wallet = wallet;
      walletSearch.offset = (this.currentPage - 1) * this.itemsPerPage;
      walletSearch.limit = this.itemsPerPage;
      walletSearch.orderBy = ['CreatedAt'];
      var result = await this.walletService.getWalletHistory(walletSearch);
      console.log("Get history result " + JSON.stringify(result));
      this.searchDatas = JSON.parse(result.message);
      this.totalItems = Number(result.data);
      this.searchDatas.forEach(element => {
        element.type = this.wallet_current.Address == element.FromAddress ? 0 : 1;//0:withdran,1:deposit
        element.CreatedAt = this.getTime(element.CreatedAt);
      });
    } catch (error) {
      console.log(error);
    }

    // this.totalItems=100;
    //  console.log('get history:' + JSON.stringify(result));
  }

  ngOnInit() {

  }

  public onClickWalletTab(event, name) {
    console.log(JSON.stringify(event) + name);
    switch (name) {
      case 'VKCW':
        this.updateCurrentWallet("VAKA");
        break;
      case 'VKCV':

        break;
      case 'BTC':
        this.updateCurrentWallet("BTC");
        break;
      case 'ETH':
        this.updateCurrentWallet("Ethereum");
        break;
      case 'EOS':
        this.updateCurrentWallet("EOS");
        break;
      default:
        break;
    }
  }

  updateCurrentWallet(networkName) {

    this.walletsData.forEach(element => {
      if (element.NetworkName == networkName) {
        this.wallet_current = element;
        this.getHistory(this.wallet_current);
        console.log(JSON.stringify(this.wallet_current));
        return;
      }
    });
  }

  // array of all items to be paged
  // items: Array<any>;
  // // current page of items
  // pageOfItems: Array<any>;
  // onChangePage($event) {
  //   console.log("EVENT " + $event);
  // }
  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  //   this.pageOfItems.forEach(element => {
  //     element.type=this.wallet_current.Address==element.FromAddress?0:1;//0:withdran,1:deposit
  //     element.CreatedAt = this.getTime(element.CreatedAt);
  //   });
  //   console.log("ITEMSSSSSSSS:" + JSON.stringify(this.pageOfItems));
  // }

  getTime(timestamp) {
    var theDate = new Date(timestamp * 1000);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[theDate.getMonth()] + " " + theDate.getDate() + "," + theDate.getFullYear() + " " + theDate.getHours() + ":" + theDate.getMinutes();
  }




  //#region PAGE
  searchDatas;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 1;
  async pageChanged($event) {

    this.currentPage = $event;

    await this.getHistory(this.walletsData[0]);
    // console.log('sthing');
    //  this.searchRewardSetting(this.IdPartnerSearch);
  }
  //#endregion


}
