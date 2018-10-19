import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';
import { Wallet } from 'model/wallet/Wallet';
import { Root } from 'component/root/root.component';
import { WalletService } from 'services/wallet/wallet.service';
import { Jsonp } from '@angular/http';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { send } from 'q';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ClipboardService } from 'ngx-clipboard'
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent extends Root implements OnInit {

  private toasterService: ToasterService;
  private clipboardService: ClipboardService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade'
  });

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
    walletService: WalletService,
    public ngxSmartModalService: NgxSmartModalService,
    toasterService: ToasterService,
    private _clipboardService: ClipboardService
  ) {
    super(titleService, route, router);
    this.toasterService = toasterService;
    this.mAccount = mAccountSerive.mAccount;
    this.mAccount.id = "8377a95b-79b4-4dfb-8e1e-b4833443c306";
    this.Coin = "ETH";
    this.walletService = walletService;
    this.isDataLoaded = false;
    this.clipboardService=_clipboardService;
    // console.log("ACCOUNT ID: " + JSON.stringify(this.mAccount));
    this.getUserData();
  }

  popToast(type,title,body) {
    var toast = {
      type: type,
      title: title,
      body: body,
      positionClass: 'toast-top-left',
      showCloseButton: false
    };

    this.toasterService.pop(toast);
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
      this.wallet_current = this.getWalletByName(NetworkName.VAKA.toString());
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
      //   console.log("Get history result " + JSON.stringify(result));
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
    if (this.tab_current == name)
      return;
    this.currentPage = 1;
    this.tab_current = name;
    switch (name) {
      case TabName.VKCW.toString():
        this.updateCurrentWallet(NetworkName.VAKA);
        break;
      case TabName.VKCV.toString():

        break;
      case TabName.BTC.toString():

        this.updateCurrentWallet(NetworkName.BTC);
        break;
      case TabName.ETH.toString():

        this.updateCurrentWallet(NetworkName.Ethereum);
        break;
      case TabName.EOS.toString():
        this.updateCurrentWallet(NetworkName.EOS);
        break;
      default:
        break;
    }
  }
  transactionDetail_current: any;
  public onClickTransactionDetail(item) {
    this.transactionDetail_current = item;
    console.log(JSON.stringify(item));
    this.ngxSmartModalService.getModal('transactionDetail').open();
  }



  sendObject: any;
  updateSendObject(networkName) {
    this.sendObject = {};
    switch (networkName) {
      case TabName.VKCW.toString():
        this.sendObject.name = "Vakacoin";
        this.sendObject.sortName = "VKC";
        this.sendObject.networkName = NetworkName.VAKA.toString();
        break;
      case TabName.VKCV.toString():

        break;
      case TabName.BTC.toString():
        this.sendObject.name = "Bitcoin";
        this.sendObject.sortName = "BTC";
        this.sendObject.networkName = NetworkName.BTC.toString();
        break;
      case TabName.ETH.toString():
        this.sendObject.name = "Ethereum";
        this.sendObject.sortName = "ETH";
        this.sendObject.networkName = NetworkName.Ethereum.toString();
        break;
      case TabName.EOS.toString():
        this.sendObject.name = "EOS";
        this.sendObject.sortName = "EOS";
        this.sendObject.networkName = NetworkName.EOS.toString();
        break;
      default:
        break;
    }
  }
  public async onClickSend(networkName) {
    console.log("on cl0ickkkkkkkkkkkkkkkkkkkkkkkkkkk send " + networkName);
    this.updateSendObject(networkName);
    let sendWallet = this.getWalletByName(this.sendObject.networkName);
    console.log("sendwallet=========> " + JSON.stringify(sendWallet));
    if (sendWallet == null)
      return;
    var result = await this.walletService.getAddress(sendWallet.Id, sendWallet.Currency);
    //  console.log("Address =" + result.message);
    this.sendObject.address = JSON.parse(result.message);

    this.ngxSmartModalService.getModal('sendDetail').open();
  }

  public async onClickReceive(networkName) {
    console.log("onClickReceive " + networkName);
    this.updateSendObject(networkName);
    let sendWallet = this.getWalletByName(this.sendObject.networkName);
    console.log("sendwallet=========> " + JSON.stringify(sendWallet));
    if (sendWallet == null)
      return;
    var result = await this.walletService.getAddress(sendWallet.Id, sendWallet.Currency);
    //  console.log("Address =" + result.message);
    this.sendObject.address = JSON.parse(result.message);
    this.ngxSmartModalService.getModal('receiveCoin').open();
  }
  public onClickReceiveDetail() {
    this.ngxSmartModalService.getModal('receiveCoin').close();
    this.ngxSmartModalService.getModal('receiveCoinDetail').open();
  }
  public onClickCopyText(text)
  {
    this._clipboardService.copyFromContent(text);
    this.popToast('success','',text+' has been copied to clipboard');
  }
  async sendCoin(form: NgForm) {
    try {
      console.log("FORM CONTROLLLL:" + form.controls.Recipient_EmailAddress.errors.required);
      console.log("HAHAHAHAHA ============>" + JSON.stringify(form.value));
      this.sendObject.detail = form.value;
      var result = await this.walletService.checkSendCoin(this.sendObject.detail.withdrawn_from
        , this.sendObject.detail.Recipient_WalletAddress, this.sendObject.networkName, this.sendObject.detail.VKCAmount);
      console.log("RESULT " + result);
      let _checkObject = JSON.parse(result.message);
      this.sendObject.checkObject = _checkObject;
      this.ngxSmartModalService.getModal('sendConfirm').open();
      console.log("HAHAHAHAHA confirm:checkObject ============>" + JSON.stringify(this.sendObject.checkObject));
    } catch (error) {
      console.log(error);
    }


  }
  async sendCoinConfirm(form: NgForm) {
    try {

      console.log("HAHAHAHAHA confirm ============>" + JSON.stringify(form.value));
      this.ngxSmartModalService.getModal('sendDetail').close();
      this.ngxSmartModalService.getModal('sendConfirm').close();
      this.ngxSmartModalService.getModal('popup_ok').open();
    } catch (error) {

    }

  }
  closePopup(name) {
    this.ngxSmartModalService.getModal(name).close();
  }
  async updateCurrentWallet(networkName: NetworkName) {
    this.wallet_current = null;
    //  if (this.walletsData != null && this.walletsData.length >= 0)
    this.wallet_current = this.getWalletByName(networkName.toString());
    // this.walletsData.forEach(element => {
    //   if (element.Currency == networkName) {
    //     this.wallet_current = element;
    //     //    this.getHistory(this.wallet_current);
    //     return;
    //   }
    // });
    console.log("get history of " + JSON.stringify(this.wallet_current));
    await this.getHistory(this.wallet_current);
  }

  getWalletByName(networkName) {
    let _output = null;
    try {
      this.walletsData.forEach(element => {
        if (element.Currency == networkName.toString()) {
          _output = element;
          console.log("get " + JSON.stringify(element));
          return element;
          //    this.getHistory(this.wallet_current);
        }
      });
    } catch (error) {
      console.log(error);
    }

    return _output;
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
enum NetworkName {
  VAKA = "VAKA",
  BTC = "BTC",
  Ethereum = "Ethereum",
  EOS = "EOS",
}

enum TabName {
  VKCW = 'VKCW',
  VKCV = 'VKCV',
  BTC = 'BTC',
  ETH = 'ETH',
  EOS = 'EOS',
}
