import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
import { ResultObject } from 'model/result/ResultObject';
import { TwofaService } from 'services/twofa/twofa.service';
import { Action } from 'model/Action';
import * as priceCrypto from 'crypto-price';
import * as WAValidator from 'wallet-address-validator';
import { utf8Encode } from '@angular/compiler/src/util';

//import * as cc from 'currency-converter';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  // API endpoints
  url_getAllWalletByUserID = '/api/wallet/all'
  url_getWalletInfor = '/api/wallet/History'
  url_getExchangeRate = '/api/wallet/GetExchangeRate'
  url_getWalletHistory = '/api/wallet/History'
  url_getAddress = '/api/wallet/AddressInfor'
  url_checkSendCoin = '/api/wallet/CheckSendCoin'
  url_checkEmail = '/api/wallet/CheckUserMail'
  url_requiteSMSCode = '/api/twofa/transaction/require-send-code-phone'
  // url_verifyCode = 'api/twofa/transaction/verify-code'
  //url_sendTransactions = '/api/wallet/sendTransactions'
  url_sendTransactions = '/api/twofa/transaction/verify-code'
  url_createWallet = '/api/tools/create-addresses'
  url_currencyConvert = '/api/currency/VND';
  // Status
  isLoading = false;

  constructor(private httpService: HttpService, private twofaService: TwofaService) { }

  async getAllWallet() {
    try {
      let operation = 'get all wallets by info user';
      let api = this.url_getAllWalletByUserID;
      let result = await this.httpService.get(operation, api, false);


      if (Utility.isError(result)) {
        console.log(result.message);
        return;
      }
      else {
        return result;

      }

    } catch (error) {
      console.log(JSON.stringify(error));
    }

  }
  async getExchangeRate(networkName) {
    //console.log("RATE "+exchangeRate);

    let coinName = '';
    switch (networkName) {
      case "Bitcoin":
        coinName = 'BTC';
        break;
      case "Ethereum":
        coinName = 'ETH';
        break;
      case "VakaCoin":

        break;
      default:
        return true;
        break;
    }
    return priceCrypto.getCryptoPrice('USD', coinName).then(obj => { // Base for ex - USD, Crypto for ex - ETH
      console.log("get PRICE        " + networkName + " " + obj.price);

      //   cc.rates('USD','VND').then(
      //     (o)=>{console.log(o)}
      // );
      return obj.price;
      // let money = convertCurrency.convert(1, { from: "USD", to: "VND" });
      // console.log(money+" VND");
      //  convertCurrency(obj.price, 'USD', 'BRL').then(response => {console.log(response)});
    }).catch(err => {
      console.log(err)
      return -1;
    })
    // try {
    //   let operation = 'get exchange rate';
    //   let api = this.url_getExchangeRate + "?networkName=" + networkName;
    //   let result = await this.httpService.get(operation, api, false);
    //   if (Utility.isError(result)) {
    //     console.log(result.message);
    //     return;
    //   }
    //   else {
    //     return result;
    //   }
    // } catch (error) {
    //   console.log(JSON.stringify(error));
    // }
  }


  async getWalletInfor() {
    try {
      let operation = 'get info user';
      let api = this.url_getWalletInfor;
      let result = await this.httpService.get(operation, api, false);
      if (Utility.isError(result)) {
        //  console.log(result.message);
        return;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  async getAddress(walletID, networkName) {
    try {
      let operation = 'get info user';
      let api = this.url_getAddress + "?walletId=" + walletID + "&networkName=" + networkName + "";
      let result = await this.httpService.get(operation, api, false);
      if (Utility.isError(result)) {
        console.log(result.message);
        return;
      }
      else {
        return result;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async checkSendCoin(toAddress, networkName, amount) {
    try {
      let operation = 'checkSendCoin';
      let api = this.url_checkSendCoin + "?toAddress=" + toAddress + "&networkName=" + networkName + "&amount=" + amount;
      let result = await this.httpService.get(operation, api, false);
      if (Utility.isError(result)) {
        console.log(result.message);
        return;
      }
      else {
        return result;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async checkEmail(email) {
    try {
      let operation = 'checkSendCoin';
      
      console.log("EMAIL "+escape(email));
     // enc
      let api = this.url_checkEmail + "?userMail=" + encodeURIComponent(email);
   //  api= encodeURI(api);
      console.log("api"+api);
      let result = await this.httpService.get(operation, api, false);
     return result;
      // if (Utility.isError(result)) {
      //   console.log(result.message);
      //   return;
      // }
      // else {
      //   return result;
      // }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  //CALL SMS CODE
  sendCoinMakeSMSCode() {
   // let operation = 'request sms code';
   // let api = this.url_requiteSMSCode;
  //  return this.httpService.post(operation, api, null, false);
    this.twofaService.requireSendCodePhone(Action.SEND_TRANSACTION);
  }
  //SEND DATA WITH SMSCODE:
  sendCoinConfirm(sendObject): Promise<ResultObject> {
    let operation = 'send transaction';
    let api = this.url_sendTransactions;
    return this.httpService.post(operation, api, sendObject, false);
  }

  getWalletHistory(wallet): Promise<ResultObject> {
    let operation = 'get wallet history';
    let api = this.url_getWalletHistory;
    return this.httpService.post(operation, api, wallet, false);
  }


  validateAddress(address, networkName) {
    address = address.trim();
    switch (networkName) {
      case "Bitcoin":
        return WAValidator.validate(address, 'BTC');
        break;
      case "Ethereum":
        return WAValidator.validate(address, 'ETH');
        break;
      case "VakaCoin":
        return true;
        break;
      default:
        return true;
        break;
    }

    //  return this.isETHAddress(address);
  }

  createWalletAddress(data: any): Promise<ResultObject> {
    // console.log('New Wallet created!\n' + networkName);
    // this.isLoading = true;
    const operation = 'create new wallet';
    const api = this.url_createWallet;
    return this.httpService.post(operation, api, data);
  }
}
