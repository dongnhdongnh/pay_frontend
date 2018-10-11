import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  url_getAllWalletByUserID = '/api/wallet/all?userID='
  url_getWalletInfor = '/api/wallet/History'
  url_getWalletHistory = '/api/wallet/History'
  constructor(private httpService: HttpService) { }
  async getAllWallet(mAccount) {
    try {
      let operation = 'get all wallets by info user';
      let api = this.url_getAllWalletByUserID+mAccount.id;
      let result = await this.httpService.get(operation, api, false);
      console.log(mAccount.id+" result "+result);
      return result;
      if (Utility.isError(result)) {
        console.log(result.message);
        return;
      }
      else
      {


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
}
