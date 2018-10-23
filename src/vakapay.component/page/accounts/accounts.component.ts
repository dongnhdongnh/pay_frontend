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
  isDataLoaded: boolean;
  mAccount: Account;
  walletService: WalletService;
  walletsData: any;
  wallets = new Map<string, string>();
  wallet_current: any;
  tab_current;
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
    this.isDataLoaded = false;
    // console.log("ACCOUNT ID: " + JSON.stringify(this.mAccount));
    this.getUserData();
  }

  async getUserData() {
    try {
      var result = await this.walletService.getAllWallet(this.mAccount);
      console.log(result);
      this.walletsData = JSON.parse(result.message);
      for (var i = 0; i < this.walletsData.length; i++) {
        console.log(this.walletsData[i]);
        this.wallets.set(this.walletsData[i].Currency, this.nineNumber(this.walletsData[i].Balance));
        // var _w = new Wallet();
        // _w.attributesLower = this.walletsData[i];
        // this.wallets.push(_w);
        // console.log(_w.networkname);
      }
      this.isDataLoaded = true;
      this.wallet_current = this.walletsData[0];
      await this.getHistory(this.wallet_current);
    } catch (error) {
      console.log(error);
    }

  }

  async getHistory(wallet) {
    try {
      console.log("get history " + JSON.stringify(wallet));

      if (wallet == null) {
        console.log("nothing to show");
        this.searchDatas = new Array();
        this.currentPage = 1;
        this.totalItems = 0;
        return;
      }
      this.wallet_current = wallet;
      let walletSearch: any = {};
      walletSearch.userID = this.mAccount.id;
      walletSearch.networkName = this.wallet_current.Currency;
      walletSearch.offset = (this.currentPage - 1) * this.itemsPerPage;
      walletSearch.limit = this.itemsPerPage;
      walletSearch.orderBy = ['CreatedAt'];
      var result = await this.walletService.getWalletHistory(walletSearch);
      console.log("Get history result " + JSON.stringify(result));
      this.searchDatas = JSON.parse(result.message);
      this.totalItems = Number(result.data);
      this.searchDatas.forEach(element => {
        element.type = element.Amount < 0 ? 0 : 1;//0:withdran,1:deposit
        //element.Amount=Math.abs(element.Amount);
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

  public getBalance(walletName) {

    this.walletsData.forEach(element => {
      if (element.Currency == walletName) {
        {
          console.log("HELLO get Balance " + JSON.stringify(element));
          //   return JSON.stringify(element);
          console.log(element.Balance);
          return element.Balance;
          //   break;
        }
      }
    })
    return -1;

  }

  public getJSON(thing) {
    return JSON.stringify(thing);
  }

  public onClickWalletTab(event, name) {
    console.log(JSON.stringify(event) + name);
    this.tab_current = name;
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

  async updateCurrentWallet(networkName) {
    this.wallet_current = null;
    //  if (this.walletsData != null && this.walletsData.length >= 0)
    this.walletsData.forEach(element => {
      if (element.Currency == networkName) {
        this.wallet_current = element;
        //    this.getHistory(this.wallet_current);
        console.log(JSON.stringify(this.wallet_current));
        return;
      }
    });

    await this.getHistory(this.wallet_current);
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
  searchDatas = new Array();
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 1;
  async pageChanged($event) {

    this.currentPage = $event;

    await this.getHistory(this.wallet_current);
    // console.log('sthing');
    //  this.searchRewardSetting(this.IdPartnerSearch);
  }
  //#endregion
  nineNumber(x) {
  
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += (new Array(e + 1)).join('0');
      }
    }
    return x;
  }

}
