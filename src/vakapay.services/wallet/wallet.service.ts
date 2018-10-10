import { Injectable } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { Utility } from 'utility/Utility';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  url_getAllWallet = '/api/wallet/all'
  url_getWalletInfor = '/api/wallet/History'
  url_getWalletHistory = '/api/wallet/History'
  constructor(private httpService: HttpService) { }
  async getAllWallet(mAccount) {
    try {
      let operation = 'get info user';
      let api = this.url_getAllWallet;
      await this.httpService.post(operation, api, mAccount, false)
        .then((result) => {
          console.log(JSON.stringify(result));
        })
      // if (Utility.isError(result)) {
      //   console.log(result.message);
      //   return;

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
