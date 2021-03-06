import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'model/portfolio/Portfolio';
import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { CurrentCurrency } from 'model/currency/Currency'
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  configService: ConfigService;
  private apiUrl = '';
  isLoading = true;
  currentCurrency: CurrentCurrency;
  account: Account;
  accountService: AccountService;

  constructor(private httpService: HttpService, configService: ConfigService,
    currentCurrency: CurrentCurrency, accountService: AccountService) {
    this.accountService = accountService;
    this.account = this.accountService.mAccount;
    this.configService = configService;
    this.apiUrl = this.configService.urlApi;
    this.currentCurrency = currentCurrency;
  }

  ngOnInit() {
    this.getData('/api/portfolio/value/current');
    var self = this;
    setInterval(function () {
      self.getData('/api/portfolio/value/current');
    }, 5 * 60 * 1000);
  }

  portfolio: Portfolio[] = [];
  vakaValue: number = 0;
  btcValue: number = 0;
  ethValue: number = 0;

  public async getData(apiString = '') {
    this.portfolio.length = 0;
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);

    while (this.currentCurrency.isLoading) {
      await Utility.sleep(100);
    }

    if (apiData && apiData.data) {
      var objectData = apiData.data;
      this.vakaValue = Number(!objectData["VakacoinValue"] ? "0" : objectData["VakacoinValue"]) * this.currentCurrency.exchangeRate;
      this.btcValue = Number(!objectData["BitcoinValue"] ? "0" : objectData["BitcoinValue"]) * this.currentCurrency.exchangeRate;
      this.ethValue = Number(!objectData["EthereumValue"] ? "0" : objectData["EthereumValue"]) * this.currentCurrency.exchangeRate;

      var total = this.vakaValue + this.btcValue + this.ethValue;

      var vaka = new Portfolio("Vakacoin", total, !objectData["VakacoinAmount"] ? "0" : objectData["VakacoinAmount"], this.vakaValue, this.currentCurrency.symbol);
      this.portfolio.push(vaka);

      var btc = new Portfolio("Bitcoin", total, !objectData["BitcoinAmount"] ? "0" : objectData["BitcoinAmount"], this.btcValue, this.currentCurrency.symbol);
      this.portfolio.push(btc);

      var eth = new Portfolio("Ethereum", total, !objectData["EthereumAmount"] ? "0" : objectData["EthereumAmount"], this.ethValue, this.currentCurrency.symbol);
      this.portfolio.push(eth);

      this.doughnutChartData = [this.vakaValue, this.btcValue, this.ethValue];
    }
    this.isLoading = false;
  }

  // Doughnut
  public doughnutChartLabels: string[] = ['Vakacoin', 'Bitcoin', 'Ethereum'];
  public doughnutChartData: number[] = [0, 0, 0];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
