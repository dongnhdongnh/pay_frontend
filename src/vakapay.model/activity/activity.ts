import { Model } from "model/Model";
import { SystemJsNgModuleLoader } from "@angular/core";

export class Activity {
    day: string;
    month: string;
    fullTime: string;
    isSend: boolean;
    networkName: string;
    fromAddress: string;
    toAddress: string;
    amount: string;
    value: string;
    hash: string;
    price: string;
    blockNumber: string;
    symbol: string;
    status: string;
    transactionUrl: string;
    currencySymbol: string;

    constructor(timestamp, isSend, networkName, fromAddress, toAddress, amount, value, hash, price, blockNumber, status, currencySymbol) {
        var date = new Date(Number(timestamp+'000'));
        var dateElement = date.toString().split(' ');
        this.day = dateElement[2];
        this.month = dateElement[1];
        this.fullTime = date.toLocaleString();

        this.isSend = isSend;
        this.networkName = networkName;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.value = value;
        this.hash = hash;
        this.price = price;
        this.blockNumber = blockNumber;
        this.status = status;
        switch (networkName) {
            case "vakacoin":
                this.symbol = "VKC";
                this.transactionUrl = "https://www.blockchain.com/btc/tx/"+hash;
                break;
            
            case "bitcoin":
                this.symbol = "BTC";
                this.transactionUrl = "https://www.blockchain.com/btc/tx/"+hash;
                break;

            case "ethereum":
                this.symbol = "ETH";
                this.transactionUrl = "https://etherscan.io/tx/"+hash;
                break;
        
            default:
                break;
        }
        this.currencySymbol = currencySymbol;
    }
}