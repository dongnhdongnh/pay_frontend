import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';
import { Root } from 'component/root/root.component';
import { WalletService } from 'services/wallet/wallet.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ClipboardService } from 'ngx-clipboard'
import { UtilityValidate } from 'utility/UtilityValidate';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent extends Root implements OnInit {
  @ViewChild('sendCoinForm') sendCoinForm: NgForm;
  private toasterService: ToasterService;
  private clipboardService: ClipboardService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade'
  });
  index: any;
  Coin: any;
  withdrawn_from: any;
  isDataLoaded: boolean;
  sendByAd: boolean;
  mAccount: Account;
  walletService: WalletService;
  walletsData: any;
  wallets = new Map<string, any>();
  wallet_current: any;
  tab_current: any;

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
    //this.mAccount.id = "8377a95b-79b4-4dfb-8e1e-b4833443c306";
    this.walletService = walletService;
    this.isDataLoaded = false;
    this.clipboardService = _clipboardService;
    // console.log("ACCOUNT ID: " + JSON.stringify(this.mAccount));
    this.getUserData();

    this.sendByAd = true;
  }

  popToast(type, title, body) {
    var toast = {
      type: type,
      title: title,
      body: body,
      positionClass: 'toast-top-left',
      showCloseButton: false
    };

    this.toasterService.pop(toast);
  }
  async getUserData(loadDefault = true) {
    try {
      var result = await this.walletService.getAllWallet(this.mAccount);
      console.log(result);
      this.walletsData = JSON.parse(result.message);
      for (var i = 0; i < this.walletsData.length; i++) {
        console.log(this.walletsData[i]);
        this.walletsData[i].Balance = this.nineNumber(this.walletsData[i].Balance);
        this.wallets.set(this.walletsData[i].Currency, this.walletsData[i]);
        // var _w = new Wallet();
        // _w.attributesLower = this.walletsData[i];
        // this.wallets.push(_w);
        // console.log(_w.networkname);
      }
      this.isDataLoaded = true;
      if (loadDefault)
        this.wallet_current = this.getWalletByName(NetworkName.VAKA.toString());
      this.tab_current = {};
      this.tab_current.sortName = "VKC";
      this.tab_current.fullName = "VakaCoin";
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
      walletSearch.orderBy = ['-CreatedAt'];
      walletSearch.search = this.vkcSearchValue;
      var result = await this.walletService.getWalletHistory(walletSearch);
      //   console.log("Get history result " + JSON.stringify(result));
      this.searchDatas = JSON.parse(result.message);
      this.totalItems = Number(result.data);
      if (this.searchDatas)
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

  searchHistory(valueThing) {
    console.log("SEARCH====== " + valueThing);
    if (valueThing == this.vkcSearchValue)
      return;
    this.vkcSearchValue = valueThing;

    this.currentPage = 0;
    this.getHistory(this.wallet_current);
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
    if (this.tab_current && this.tab_current.sortName == name)
      return;
    this.tab_current = {};
    this.tab_current.sortName = name;
    this.searchDatas = new Array();
    this.currentPage = 1;
    this.totalItems = 0;
    switch (name) {
      case TabName.VKC.toString():
        this.updateCurrentWallet(NetworkName.VAKA);
        this.tab_current.fullName = "VakaCoin";
        break;
      case TabName.VKCV.toString():

        break;
      case TabName.BTC.toString():

        this.updateCurrentWallet(NetworkName.BTC);
        this.tab_current.fullName = "Bitcoin";
        break;
      case TabName.ETH.toString():

        this.updateCurrentWallet(NetworkName.Ethereum);
        this.tab_current.fullName = "Ethereum";
        break;
      case TabName.EOS.toString():
        this.updateCurrentWallet(NetworkName.EOS);
        this.tab_current.fullName = "EOS";
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
      case TabName.VKC.toString():
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

    this.errorObject = {};
    this.sendCoinForm.reset();
    this.updateSendObject(networkName);
    let sendWallet = this.getWalletByName(this.sendObject.networkName);
    console.log("sendwallet=========> " + JSON.stringify(sendWallet));
    if (sendWallet == null)
      return;
    // var result = await this.walletService.getAddress(sendWallet.Id, sendWallet.Currency);
    // this.sendObject.address = JSON.parse(result.message);
    var result_exchangeRate = await this.walletService.getExchangeRate(sendWallet.Currency);
    this.sendObject.exchangeRate = result_exchangeRate.message;
    this.ngxSmartModalService.getModal('sendDetail').open();
    this.validateSendCoin(this.sendCoinForm);
  }
  vndValue = 0;
  vkcValue = 0;
  vkcSearchValue = "";
  ExchangeRateInput(typeName) {
    if (!this.sendObject.exchangeRate)
      return;
    console.log("WHAT " + typeName);
    switch (typeName) {
      case "VKC":
        this.vndValue = this.vkcValue / this.sendObject.exchangeRate;
        this.validateSendCoin(this.sendCoinForm);
        break;
      case "VND":
        this.vkcValue = this.vndValue * this.sendObject.exchangeRate;
        this.validateSendCoin(this.sendCoinForm);
        break;
      default:
        break;
    }

    // this.VKCAmount=this.sendObject.detail.VNDAmount;
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
  public onClickCopyText(text) {
    this._clipboardService.copyFromContent(text);
    this.popToast('success', '', text + ' has been copied to clipboard');
  }
  async sendCoin(form: NgForm) {
    try {
      // console.log("FORM CONTROLLLL:" + form.controls.Recipient_EmailAddress.errors.required);
      console.log("HAHAHAHAHA ============>" + JSON.stringify(form.value));
      if (!this.validateSendCoin(form)) {
        console.log("validateSendCoin false");
        return;
      }
      this.sendObject.detail = form.value;
      var result = await this.walletService.checkSendCoin(this.sendObject.detail.withdrawn_from
        , this.sendObject.detail.recipientWalletAddress, this.sendObject.networkName, this.sendObject.detail.VKCAmount);
      console.log("RESULT " + result);
      let _checkObject = JSON.parse(result.message);
      this.sendObject.checkObject = _checkObject;
      this.requestSMSCode();
      this.ngxSmartModalService.getModal('sendConfirm').open();
      console.log("HAHAHAHAHA confirm:checkObject ============>" + JSON.stringify(this.sendObject.checkObject));
      console.log("SEND WITH DATA =" + JSON.stringify(this.sendObject));
    } catch (error) {
      console.log(error);
    }
  }

  requestSMSCode() {
    this.walletService.sendCoinMakeSMSCode();
  }

  errorObject: any;
  validateSendCoin(form: NgForm) {

    this.errorObject = {};
    this.errorObject.canNext = true;
    if (this.sendByAd) {
      if (form.controls.recipientWalletAddress.errors && form.controls.recipientWalletAddress.errors.required) {
        this.errorObject.recipientWalletAddress = 'Address is required';
        //  return false;
        this.errorObject.canNext = false;
      }
      else {
        if (!this.walletService.validateAddress(form.value.recipientWalletAddress, this.tab_current.fullName)) {
          this.errorObject.recipientWalletAddress = 'Address is not valid';
          this.errorObject.canNext = false;
        }

      }

    }
    else {
      if (form.controls.recipientEmailAddress.errors && form.controls.recipientEmailAddress.errors.required) {
        this.errorObject.recipientEmailAddress = 'Email is required';
        this.errorObject.canNext = false;
        //   return false;
      }
    }
    // if (form.controls.withdrawn_from.errors && form.controls.withdrawn_from.errors.required) {
    //   this.errorObject.withdrawn_from = true;
    //   return false;
    // }
    if (form.controls.VNDAmount.errors && form.controls.VNDAmount.errors.required && !this.vndValue) {
      this.errorObject.VNDAmount = 'Amount is required';
      this.errorObject.canNext = false;
      //  return false;
    }
    else {
      if (this.vndValue <= 0) {
        this.errorObject.VNDAmount = 'Amount must be greater than 0';
        this.errorObject.canNext = false;
        //  return false;
      }
      else
        if (this.vkcValue > this.wallet_current.Balance) {
          this.errorObject.VNDAmount = 'Amount cannot be greater than balance';
         // +form.value.VKCAmount +"___"+this.vkcValue+"____"+this.wallet_current.Balance;
          this.errorObject.canNext = false;
          //  return false;
        }

    }

    // if (form.controls.VKCnote.errors && form.controls.VKCnote.errors.required) {
    //   this.errorObject.VKCnote = 'Note is required';
    //  // return false;
    // }
    return this.errorObject.canNext;

  }

  async sendCoinConfirm(form: NgForm) {
    try {
      this.errorObject = {};
      this.sendObject.SMScode = form.value.VKCSMS;
      this.sendObject.detail.sendByAd = this.sendByAd;
      delete this.sendObject.checkObject;
      delete this.sendObject.exchangeRate;
    

      console.log("HAHAHAHAHA confirm ============>" + JSON.stringify(this.sendObject));
      this.ngxSmartModalService.getModal('sendDetail').close();
      this.ngxSmartModalService.getModal('sendConfirm').close();
   
      let result = await this.walletService.sendCoinConfirm(this.sendObject);
      console.log("result:========== " + JSON.stringify(result));
      if (Utility.isError(result)) {
        console.log(result.message);
        this.errorObject.sendTransactions=result.message;
      
      }
      else {
        //this.getHistory(this.wallet_current);
        this.getUserData(false);
      }
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
      if (!this.walletsData)
        return null;
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

  slideConfig: SwiperConfigInterface = {
    speed: 300,
    centeredSlides: false,
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: true,
    pagination: true,
    scrollbar: false,
    mousewheel: false
  }
  // slideConfig1 = {"speed": 300, "centeredSlides": false,"slidesPerView":4,"spaceBetween":100,"loop":false};


}
enum NetworkName {
  VAKA = "Vakacoin",
  BTC = "Bitcoin",
  Ethereum = "Ethereum",
  EOS = "EOS",
}

enum TabName {
  VKC = 'VKC',
  VKCV = 'VKCV',
  BTC = 'BTC',
  ETH = 'ETH',
  EOS = 'EOS',
}
