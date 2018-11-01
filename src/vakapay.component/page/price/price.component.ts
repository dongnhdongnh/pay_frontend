import { Component, OnInit } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  private apiUrl = '';
  configService: ConfigService;


  VkcStock: StockChart;
  BtcStock: StockChart;
  EthStock: StockChart;

  constructor(private httpService: HttpService, configService: ConfigService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/coinmarket/';
    this.getAllData();
  }

  ngOnInit() {
    var self = this;
    this.getAllData();
  }
  

  //init data by day for loading dashboard
  public getAllData() {
    this.getData('vakacoin/all');
    this.getData('bitcoin/all');
    this.getData('ethereum/all');
  }

  public async getData(apiString = '') {
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);
    var network = apiString.split("/")[0];
    if (apiData && apiData.data){
      switch (network) {
        case "vakacoin":
          this.VkcStock = new StockChart({
            rangeSelector: {
              selected: 1
            },
            series: [{
              name: 'Portfolio Price',
              data: apiData.data
            }]
          });
          break;
  
        case "bitcoin":
          this.BtcStock = new StockChart({
            rangeSelector: {
              selected: 1
            },
            series: [{
              name: 'Portfolio Price',
              data: apiData.data
            }]
          });
          break;
  
        case "ethereum":
          this.EthStock = new StockChart({
            rangeSelector: {
              selected: 1
            },
            series: [{
              name: 'Portfolio Price',
              data: apiData.data
            }]
          });
          break;
  
        default:
          break;
      }
    }
    
  }
  
}
