import { Component, OnInit } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { StockChart } from 'angular-highcharts';
import { CurrentCurrency } from 'model/currency/Currency';
import { Utility } from 'utility/Utility';
@Component({
  selector: 'app-portfolio-value',
  templateUrl: './portfolio-value.component.html',
  styleUrls: ['./portfolio-value.component.css']
})
export class PortfolioValueComponent implements OnInit {
  configService: ConfigService;
  portfolioValue: any;
  private apiUrl = '';
  data = [];
  stock: StockChart;
  isLoading = true;
  currentCurrency: CurrentCurrency;

  constructor(private httpService: HttpService, configService: ConfigService, currentCurrency: CurrentCurrency) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/portfolio/value/';
    this.currentCurrency = currentCurrency;
  }

  ngOnInit() {
    var self = this;
    self.getData('all').then(() => {
      if(self.data && self.data.length > 0){
        self.stock = new StockChart({
          rangeSelector: {
            selected: 1
          },
          series: [{
            name: 'Portfolio Price',
            data: self.data
          }]
        });
      }
    });
    setInterval(function(){
      if(self.data && self.data.length > 0){
        self.stock = new StockChart({
          rangeSelector: {
            selected: 1
          },
          series: [{
            name: 'Portfolio Price',
            data: self.data
          }]
        });
      }
    }, 5 * 60 * 1000);
    
  }

  public async getData(apiString = '') {
    this.data.length = 0;
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);
    
    while (this.currentCurrency.isLoading){
      await Utility.sleep(100);
    }

    if (apiData || apiData.data){
      var objectData = apiData.data;

      objectData.forEach(element => {
        var temp = [];
        var value = ((Number(element["BitcoinValue"]) + Number(element["EthereumValue"]) + Number(element["VakacoinValue"]))*this.currentCurrency.exchangeRate).toFixed(3);
        var time = Number(element["Timestamp"] + "000");
        this.portfolioValue = this.currentCurrency.symbol + value;
        temp.push(time, Number(value));
        this.data.push(temp);
      });
    }
    this.isLoading = false;
  }

}
