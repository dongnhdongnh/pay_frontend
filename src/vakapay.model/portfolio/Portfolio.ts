export class Portfolio{
    iconUrl: string;
    networkName: string;
    percent: string;
    amount: string;
    value: string;
    symbol: string;

    constructor(networkName = '', total = 0, amount = '', value = 0, symbol = '$'){
        this.networkName = networkName;
        if (total == 0){
            this.percent = "0";
        } else {
            this.percent = (value/total*100).toFixed(3).toString();
        }
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
            default:
                this.amount = '';
                this.iconUrl = '';
        }
        this.value = symbol + value.toFixed(3);
        this.symbol = symbol;
    }

}