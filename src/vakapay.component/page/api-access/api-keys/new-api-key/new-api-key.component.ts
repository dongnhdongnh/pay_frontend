import { ApiAccess } from 'model/api-access/ApiAccess';
import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ApiAccessService } from 'services/api-access/apiAccess.service';
import { Model } from 'model/Model';

@Component({
  selector: 'app-new-api-key',
  templateUrl: './new-api-key.component.html',
  styleUrls: ['./new-api-key.component.css']
})

export class NewApiKeyComponent {
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

  walletType: WalletType;
  apiAccess: ApiAccess;

  //message
  messageErrorWalletType: string = '';

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public apiAccessService: ApiAccessService) {
    this.walletType = new WalletType();
    this.apiAccess = apiAccessService.apiAccess;
  }

  ngOnit() {

  }

  validate() {
    let isChooseWalletType =
      this.isBtcWallet ||
      this.isEosWallet ||
      this.isVkcWallet ||
      this.isVkcVault ||
      this.isEthWallet ||
      this.isVakaWallet;

    if (isChooseWalletType === false) {
      this.messageErrorWalletType = `Please choose least one type of wallet`;
      return;
    }

    this.messageErrorWalletType = '';

  }

  onShowModal() {
    this.ngxSmartModalService.getModal('modal').open();
  }

  onCloseModal() {
    this.ngxSmartModalService.getModal('modal').close();
  }

  onReset() {
    this.isAll = false;
    this.isBtcWallet = false;
    this.isEosWallet = false;
    this.isVkcWallet = false;
    this.isVkcVault = false;
    this.isEthWallet = false;
  }

  cancel() {
    this.onCloseModal();
    this.onReset();
  }

  onUpdate() {
    this.validate();
  }

  changeWallet(_walletType = this.walletType.IS_ALL) {
    if (_walletType === this.walletType.IS_ALL) {
      let value = !this.isAll;
      this.isBtcWallet = value;
      this.isEosWallet = value;
      this.isVkcWallet = value;
      this.isVkcVault = value;
      this.isEthWallet = value;
      this.isVakaWallet = value;
    }

    if (_walletType === this.walletType.IS_BTC_WALLET) {
      this.isBtcWallet = !this.isBtcWallet;
    }
    if (_walletType === this.walletType.IS_EOS_WALLET) {
      this.isEosWallet = !this.isEosWallet;
    }
    if (_walletType === this.walletType.IS_VKC_WALLET) {
      this.isVkcWallet = !this.isVkcWallet;
    }
    if (_walletType === this.walletType.IS_ETH_WALLET) {
      this.isEthWallet = !this.isEthWallet;
    }
    if (_walletType === this.walletType.IS_VKC_VAULT) {
      this.isVkcVault = !this.isVkcVault;
    }

    if (_walletType === this.walletType.IS_VAKA_WALLET) {
      this.isVakaWallet = !this.isVakaWallet;
    }

    this.isAll =
      this.isBtcWallet &&
      this.isEosWallet &&
      this.isVkcWallet &&
      this.isVkcVault &&
      this.isEthWallet &&
      this.isVakaWallet;

    this.validate();
    return;
  }

  hasWallet(_wallet) {
    return this.apiAccess.listWallet.includes(_wallet);
  }

}

class WalletType {
  IS_ALL: string;
  IS_BTC_WALLET: string;
  IS_EOS_WALLET: string;
  IS_VKC_WALLET: string;
  IS_ETH_WALLET: string;
  IS_VKC_VAULT: string;
  IS_VAKA_WALLET: string;

  constructor() {
    this.IS_ALL = 'ALL';
    this.IS_BTC_WALLET = 'BTC';
    this.IS_EOS_WALLET = 'EOS';
    this.IS_VKC_WALLET = 'VKC';
    this.IS_ETH_WALLET = 'ETH';
    this.IS_VKC_VAULT = 'VKC VAULT';
    this.IS_VAKA_WALLET = 'VAKA'
  }
}

class ApiType extends Model {
  CREATED_ADDRESSES: string;
  CREATED_DEPOSITS: string;
  READ_ADDRESSES: string;
  READ_DEPOSITS: string;
  READ_TRANSACTIONS: string;
  SEND_TRANSACTIONS: string;
  USER_MAIL: string;
  USER_READ: string;

  constructor() {
    super();
    this.CREATED_ADDRESSES = "wallet:addresses:create";
    this.CREATED_DEPOSITS = "wallet:deposits:create";
    this.READ_ADDRESSES = "wallet:addresses:read";
    this.READ_DEPOSITS = "wallet:deposits:read";
    this.READ_TRANSACTIONS = "wallet:transactions:read";
    this.SEND_TRANSACTIONS = "wallet:transactions:send";
    this.USER_MAIL = "wallet:user:email";
    this.USER_READ = "wallet:user:read";
  }
}
