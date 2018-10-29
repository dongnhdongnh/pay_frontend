import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { ApiAccess } from 'model/api-access/ApiAccess';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ApiAccessService } from 'services/api-access/apiAccess.service';
import { Model } from 'model/Model';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { WalletType } from 'model/wallet/WalletType';
import { ApiType } from 'model/api-access/ApiType';

@Component({
  selector: 'app-new-api-key',
  templateUrl: './new-api-key.component.html',
  styleUrls: ['./new-api-key.component.css']
})

export class NewApiKeyComponent {
  @ViewChild('code') codeElement: ElementRef;

  //step
  step: number = 1;

  //input
  code: string = '';
  wallets: string[] = [];
  apis: string[] = [];

  //validate
  isValid: boolean = false;
  isLoading: boolean = false;

  //select wallet
  isAll: boolean = false;
  isBtcWallet: boolean = false;
  isEosWallet: boolean = false;
  isVkcWallet: boolean = false;
  isVkcVault: boolean = false;
  isEthWallet: boolean = false;
  isVakaWallet: boolean = false;

  //select api
  is_CREATED_ADDRESSES: boolean = false;
  is_CREATED_DEPOSITS: boolean = false;
  is_READ_ADDRESSES: boolean = false;
  is_READ_DEPOSITS: boolean = false;
  is_READ_TRANSACTIONS: boolean = false;
  is_SEND_TRANSACTIONS: boolean = false;
  is_USER_MAIL: boolean = false;
  is_USER_READ: boolean = false;

  apiAccess: ApiAccess;

  //message
  messageErrorWalletType: string = '';
  messageErrorApiType: string = '';
  messageErrorCode: string = '';

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public apiAccessService: ApiAccessService,
    public apiKeyService: ApiKeyService,
  ) {
    this.apiAccess = apiAccessService.apiAccess;
  }

  onCode(event) {
    try {
      if (Utility.isEnter(event)) {
        // this.onUpdate();
        return;
      }

      //Get value
      this.code = Utility.getValueEventInput(event);

      UtilityValidate.validateToken(this.code);

      this.messageErrorCode = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorCode = error.message;
      this.isValid = false;
    }
  }

  validate() {
    try {
      this.isValid = false;
      this.wallets = [];
      this.apis = [];

      if (this.isBtcWallet) this.wallets.push(WalletType.BTC);
      if (this.isEosWallet) this.wallets.push(WalletType.EOS);
      if (this.isVkcWallet) this.wallets.push(WalletType.VKC);
      if (this.isVkcVault) this.wallets.push(WalletType.VKC_VAULT);
      if (this.isEthWallet) this.wallets.push(WalletType.ETH);
      if (this.isVakaWallet) this.wallets.push(WalletType.VAKA);

      if (this.wallets.length === 0) {
        this.messageErrorWalletType = `Please choose least one type of wallet`;
        return;
      }

      this.messageErrorWalletType = '';

      if (this.is_CREATED_ADDRESSES) this.apis.push(ApiType.CREATED_ADDRESSES);
      if (this.is_CREATED_DEPOSITS) this.apis.push(ApiType.CREATED_DEPOSITS);
      if (this.is_READ_ADDRESSES) this.apis.push(ApiType.READ_ADDRESSES);
      if (this.is_READ_DEPOSITS) this.apis.push(ApiType.READ_DEPOSITS);
      if (this.is_READ_TRANSACTIONS) this.apis.push(ApiType.READ_TRANSACTIONS);
      if (this.is_SEND_TRANSACTIONS) this.apis.push(ApiType.SEND_TRANSACTIONS);
      if (this.is_USER_MAIL) this.apis.push(ApiType.USER_MAIL);
      if (this.is_USER_READ) this.apis.push(ApiType.USER_READ);

      if (this.apis.length === 0) {
        this.messageErrorApiType = `Please choose least one type of api`;
        return;
      }

      if (this.step > 1) {
        UtilityValidate.validateCode(this.code);
      }

      this.messageErrorApiType = '';
      this.isValid = true;
      return;
    } catch (error) {
      this.isValid = false;
      console.log(error.message);
    }
  }

  onShowModal() {
    this.ngxSmartModalService.getModal('modalCreate').open();
  }

  onCloseModal() {
    this.ngxSmartModalService.getModal('modalCreate').close();
  }

  onReset() {
    //wallet
    this.isAll = false;
    this.isBtcWallet = false;
    this.isEosWallet = false;
    this.isVkcWallet = false;
    this.isVkcVault = false;
    this.isEthWallet = false;

    //api
    this.is_CREATED_ADDRESSES = false;
    this.is_CREATED_DEPOSITS = false;
    this.is_READ_ADDRESSES = false;
    this.is_READ_DEPOSITS = false;
    this.is_READ_TRANSACTIONS = false;
    this.is_SEND_TRANSACTIONS = false;
    this.is_USER_MAIL = false;
    this.is_USER_READ = false;

    //step
    this.step = 1;

    //valid
    this.isValid = false;

    //input
    this.codeElement.nativeElement.value = '';

    //message
    this.messageErrorApiType = '';
    this.messageErrorCode = '';
    this.messageErrorWalletType = '';
  }

  cancel() {
    this.onCloseModal();
    this.onReset();
  }

  continue() {
    this.validate();
    if (this.isValid === false) return;
    this.step++;
    this.isValid = false;
  }

  async onUpdate() {
    try {
      this.isLoading = true;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        code: this.code,
        wallets: this.wallets.join(','),
        apis: this.apis.join(',')
      };

      //send ajax
      let result = await this.apiKeyService.create(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;
      this.onCloseModal();
      this.onReset();

      //refresh list of api key
      this.apiKeyService.refresh();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }

  }

  changeWallet(_isChangeAll: boolean = false) {
    if (_isChangeAll === true) {
      let value = this.isAll;
      if (this.apiAccess.hasBtc) this.isBtcWallet = value;
      if (this.apiAccess.hasEos) this.isEosWallet = value;
      if (this.apiAccess.hasVkc) this.isVkcWallet = value;
      if (this.apiAccess.hasVkc_Vault) this.isVkcVault = value;
      if (this.apiAccess.hasEth) this.isEthWallet = value;
      if (this.apiAccess.hasVaka) this.isVakaWallet = value;
    } else {
      let value = true;
      if (this.apiAccess.hasBtc) value = value && this.isBtcWallet;
      if (this.apiAccess.hasEos) value = value && this.isEosWallet;
      if (this.apiAccess.hasVkc) value = value && this.isVkcWallet;
      if (this.apiAccess.hasVkc_Vault) value = value && this.isVkcVault;
      if (this.apiAccess.hasEth) value = value && this.isEthWallet;
      if (this.apiAccess.hasVaka) value = value && this.isVakaWallet;
      this.isAll = value;
    }

    this.validate();
    return;
  }

  hasWallet(_wallet) {
    return this.apiAccess.listWallet.includes(_wallet);
  }

}