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
                this.iconUrl = '';
                break;
            case 'Bitcoin':
                this.amount = amount+' BTC';
                this.iconUrl = '';
                break;
            case 'Vakacoin':
                this.amount = amount+' VKC';
                this.iconUrl = '';
                break;
            case 'Eosio':
                this.amount = amount+' EOS';
                this.iconUrl = '';
                break;
            default:
                this.amount = '';
                this.iconUrl = '';
        }
        this.value = value;
    }

}