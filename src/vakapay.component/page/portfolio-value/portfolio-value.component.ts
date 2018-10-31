import { Component, OnInit } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { StockChart } from 'angular-highcharts';
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

  constructor(private httpService: HttpService, configService: ConfigService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/portfolio/value/';
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

    // if (Utility.isError) throw new Error(apiData.message);
    var objectData = apiData.data;

    objectData.forEach(element => {
      var temp = [];
      var value = (Number(element["BitcoinValue"]) + Number(element["EthereumValue"]) + Number(element["VakacoinValue"])).toFixed(3);
      var time = Number(element["Timestamp"] + "000");
      this.portfolioValue = "$ " + value;
      temp.push(time, Number(value));
      this.data.push(temp);
    });

  }

}
