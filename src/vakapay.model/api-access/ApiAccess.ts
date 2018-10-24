import { Model } from "model/Model";

export class ApiAccess extends Model {
    listApi: any;
    listWallet: any[];
    constructor() {
        super();
        this.listApi = {};
        this.listWallet = [];
    }

    hasWallet(_wallet) { return this.listWallet.includes(_wallet); }

    get hasBtc() { return this.hasWallet('BTC'); }
    get hasEos() { return this.hasWallet('EOS'); }
    get hasVkc() { return this.hasWallet('VKC'); }
    get hasEth() { return this.hasWallet('ETH'); }
    get hasVaka() { return this.hasWallet('VAKA'); }
    get hasVkc_Vault() { return this.hasWallet('VKC VAULT'); }

    hasApi(_api) {
        return this.listApi[_api] !== null &&
            this.listApi[_api] !== undefined &&
            this.listApi[_api] !== '';
    }

    get has_CREATED_ADDRESSES() { return this.hasApi('CREATED_ADDRESSES'); }
    get has_CREATED_DEPOSITS() { return this.hasApi('CREATED_DEPOSITS'); }
    get has_READ_ADDRESSES() { return this.hasApi('CREATED_DEPOSITS'); }
    get has_READ_DEPOSITS() { return this.hasApi('READ_DEPOSITS'); }
    get has_READ_TRANSACTIONS() { return this.hasApi('READ_TRANSACTIONS'); }
    get has_SEND_TRANSACTIONS() { return this.hasApi('SEND_TRANSACTIONS'); }
    get has_USER_MAIL() { return this.hasApi('USER_MAIL'); }
    get has_USER_READ() { return this.hasApi('USER_READ'); }
}