import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
import { ResultObject } from 'model/result/ResultObject';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  url_getAllWalletByUserID = '/api/wallet/all?userID='
  url_getWalletInfor = '/api/wallet/History'
  url_getWalletHistory = '/api/wallet/History'
  url_getAddress = '/api/wallet/AddressInfor'
  url_checkSendCoin = '/api/wallet/CheckSendCoin'
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

  async checkSendCoin(fromAddress,toAddress,networkName,amount) {
    try {
      let operation = 'checkSendCoin';
      let api = this.url_checkSendCoin + "?fromAddress=" + fromAddress+"&toAddress="+toAddress + "&networkName=" + networkName +"&amount="+amount;
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

  getWalletHistory(wallet): Promise<ResultObject> {
    let operation = 'get wallet history';
    let api = this.url_getWalletHistory;
    return this.httpService.post(operation, api, wallet, false);
  }

}
