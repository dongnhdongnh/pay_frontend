import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
import { ResultObject } from 'model/result/ResultObject';
import * as crypto from 'crypto-js';
import * as WAValidator from 'wallet-address-validator';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  url_getAllWalletByUserID = '/api/wallet/all?userID='
  url_getWalletInfor = '/api/wallet/History'
  url_getExchangeRate = '/api/wallet/GetExchangeRate'
  url_getWalletHistory = '/api/wallet/History'
  url_getAddress = '/api/wallet/AddressInfor'
  url_checkSendCoin = '/api/wallet/CheckSendCoin'
  url_requiteSMSCode = '/api/twofa/transaction/require-send-code-phone'

  private url_create_new_wallet = '/api/wallet/create-new'

  // url_verifyCode = 'api/twofa/transaction/verify-code'
  url_sendTransactions = '/api/wallet/sendTransactions'
  constructor(private httpService: HttpService) { }
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
  async getExchangeRate(networkName) {
    try {
      let operation = 'get exchange rate';
      let api = this.url_getExchangeRate + "?networkName=" + networkName;
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

  create(data: any = { walletType: 'ETH' }) {
    let operation = 'create new wallet';
    let api = this.url_create_new_wallet;
    return this.httpService.post(operation, api, data, false);
  }
}
