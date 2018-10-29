import { Model } from "model/Model";
import { UtilityFormat } from "utility/utilityFormat";
import { WalletType } from "model/wallet/WalletType";

export class ApiKey extends Model {
    id: string;
    apiAllow: string;
    keyApi: string;
    wallets: string;
    permissions: string;
    callbackUrl: string;
    secret: string;
    userId: string;
    status: number;
    createdAt: number;
    updatedAt: number;

    constructor() {
        super();
        this.id = '';
        this.apiAllow = '';
        this.keyApi = '';
        this.wallets = '';
        this.permissions = '';
        this.callbackUrl = '';
        this.secret = '';
        this.userId = '';
        this.status = 0;
        this.createdAt = 0;
        this.updatedAt = 0;
    }

    get _createdAt() {
        return UtilityFormat.formatDateText(this.createdAt * 1000);
    }

    get _updatedAt() {
        return UtilityFormat.formatDateText(this.updatedAt * 1000);
    }

    get listWallet() {
        return this.wallets.split(',').map(x => x.trim());
    }

    get listPermission() {
        return this.permissions.split(',').map(x => x.trim());
    }

    hasWallet(_wallet) { return this.listWallet.includes(_wallet); }

    get hasBtc() { return this.hasWallet(WalletType.BTC); }
    get hasEos() { return this.hasWallet(WalletType.EOS); }
    get hasVkc() { return this.hasWallet(WalletType.VKC); }
    get hasEth() { return this.hasWallet(WalletType.ETH); }
    get hasVaka() { return this.hasWallet(WalletType.VAKA); }
    get hasVkc_Vault() { return this.hasWallet(WalletType.VKC_VAULT); }

    hasApi(_api) {
        return this.listPermission.includes(_api);
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