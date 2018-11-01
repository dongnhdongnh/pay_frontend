import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
import { ResultObject } from 'model/result/ResultObject';
import * as priceCrypto from 'crypto-price';
import * as convertCurrency from 'money';
import * as WAValidator from 'wallet-address-validator';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  // API endpoints
  url_getAllWalletByUserID = '/api/wallet/all?userID='
  url_getWalletInfor = '/api/wallet/History'
  url_getExchangeRate = '/api/wallet/GetExchangeRate'
  url_getWalletHistory = '/api/wallet/History'
  url_getAddress = '/api/wallet/AddressInfor'
  url_checkSendCoin = '/api/wallet/CheckSendCoin'
  url_requiteSMSCode = '/api/twofa/transaction/require-send-code-phone'
  // url_verifyCode = 'api/twofa/transaction/verify-code'
  url_sendTransactions = '/api/wallet/sendTransactions'
<<<<<<< HEAD
  url_createWallet = '/api/wallet/create-new'

  // Status
  isLoading = false;

  constructor(private httpService: HttpService) { }

=======

  constructor(private httpService: HttpService) { }
  
>>>>>>> b3e1be58e7f64d3d2746f9e5ff5670f861dc9e35
  async getAllWallet(mAccount) {
    try {
      let operation = 'get all wallets by info user';
      let api = this.url_getAllWalletByUserID + mAccount.id;
      let result = await this.httpService.get(operation, api, false);
      console.log(mAccount.id + " result " + result);

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
  getExchangeRate(networkName) {
    return priceCrypto.getCryptoPrice('USD', 'ETH').then(obj => { // Base for ex - USD, Crypto for ex - ETH
      console.log("get PRICE        " + obj.price)
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
        console.log(result.message);
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

  async checkSendCoin(fromAddress, toAddress, networkName, amount) {
    try {
      let operation = 'checkSendCoin';
      let api = this.url_checkSendCoin + "?fromAddress=" + fromAddress + "&toAddress=" + toAddress + "&networkName=" + networkName + "&amount=" + amount;
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

  //CALL SMS CODE
  sendCoinMakeSMSCode(): Promise<ResultObject> {
    let operation = 'request sms code';
    let api = this.url_requiteSMSCode;
    return this.httpService.post(operation, api, null, false);
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
<<<<<<< HEAD

  createWalletAddress(data: any) {
    console.log('New Wallet created!\n' + data);
    this.isLoading = true;
    // const operation = 'create new wallet';
    // const api = this.url_createWallet;
    // return this.httpService.post(operation, api, data);
  }




=======
>>>>>>> b3e1be58e7f64d3d2746f9e5ff5670f861dc9e35
}
