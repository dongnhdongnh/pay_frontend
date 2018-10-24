import { Model } from "model/Model";

export class Portfolio{
    iconUrl: string;
    networkName: string;
    percent: string;
    amount: string;
    value: string;

    constructor(networkName = '', percent = '', amount = '', value = ''){
        this.networkName = networkName;
        this.percent = percent;
        switch(networkName){
            case 'Ethereum':
                this.amount = amount + ' ETH';
                this.iconUrl = 'assets/images/icons/icon-eth.svg';
                break;
            case 'Bitcoin':
                this.amount = amount+' BTC';
                this.iconUrl = 'assets/images/icons/icon-btc.svg';
                break;
            case 'Vakacoin':
                this.amount = amount+' VKC';
                this.iconUrl = 'assets/images/icons/icon-vkc.svg';
                break;
            case 'Eosio':
                this.amount = amount+' EOS';
                this.iconUrl = 'assets/images/icons/icon-eos.svg';
                break;
            default:
                this.amount = '';
                this.iconUrl = '';
        }
        this.value = value;
    }

}