import { Component, OnInit } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  lineChartLegend: any;
  

  constructor(private httpService: HttpService, configService: ConfigService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/coinmarket/';
    this.getDataByDay();
  }

  ngOnInit() {
    var self = this;
    setInterval(function(){
      if (self.isDay){
        self.timeOption("day");
      }
      if (self.isWeek){
        self.timeOption("week");
      }
      if (self.isMonth){
        self.timeOption("month");
      }
      if (self.isYear){
        self.timeOption("year");
      }
      if (self.isAll){
        self.timeOption("all");
      }
    }, 5*60*1000);
  }
  
  //time options
  isDay = true;
  isWeek = false;
  isMonth = false;
  isYear = false;
  isAll = false;
  private apiUrl = '';
  configService: ConfigService;

  //vakacoin
  public lineChartData_VKC = [];
  public lineChartLabels_VKC = [];

  //bitcoin
  public lineChartData_BTC = [];
  public lineChartLabels_BTC = [];

  //ethereum
  public lineChartData_ETH = [];
  public lineChartLabels_ETH = [];

  //init data by day for loading dashboard
  public getDataByDay() {
    this.getData('vakacoin/day');
    this.getData('bitcoin/day');
    this.getData('ethereum/day');
  }

  public getDataByWeek() {
    this.getData('vakacoin/week');
    this.getData('bitcoin/week');
    this.getData('ethereum/week');
  }

  public getDataByMonth() {
    this.getData('vakacoin/month');
    this.getData('bitcoin/month');
    this.getData('ethereum/month');
  }

  public getDataByYear() {
    this.getData('vakacoin/year');
    this.getData('bitcoin/year');
    this.getData('ethereum/year');
  }

  public getAllData() {
    this.getData('vakacoin/all');
    this.getData('bitcoin/all');
    this.getData('ethereum/all');
  }

  private resetData(): void {
    //vakacoin
    this.lineChartData_VKC.length = 0;
    this.lineChartLabels_VKC.length = 0;

    //bitcoin
    this.lineChartData_BTC.length = 0;
    this.lineChartLabels_BTC.length = 0;

    //ethereum
    this.lineChartData_ETH.length = 0;
    this.lineChartLabels_ETH.length = 0;
  }

  public async getData(apiString = '') {
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);
    var network = apiString.split("/")[0];
    var timeOption = apiString.split("/")[1];
    switch (network) {
      case "vakacoin":
        this.getDataVKC(apiData, timeOption);
        break;

      case "bitcoin":
        this.getDataBTC(apiData, timeOption);
        break;

      case "ethereum":
        this.getDataETH(apiData, timeOption);
        break;

      default:
        break;
    }
  }

  public getDataVKC(apiData, timeOption) {
    var stringtData = apiData.data.toString();
    var arrData = stringtData.split(",");
    arrData.forEach((element, index) => {
      if (index % 2 == 1) {
        this.lineChartData_VKC.push(element);
      } else {
        this.lineChartLabels_VKC.push(this.timeBy(element, timeOption));
      }
    });
    this.Data_VKC = [
      { data: this.lineChartData_VKC, fill: true, label: 'price' }
    ];
    this.Labels_VKC = this.lineChartLabels_VKC;
  }

  public getDataBTC(apiData, timeOption) {
    var stringtData = apiData.data.toString();
    var arrData = stringtData.split(",");
    arrData.forEach((element, index) => {
      if (index % 2 == 1) {
        this.lineChartData_BTC.push(element);
      } else {
        this.lineChartLabels_BTC.push(this.timeBy(element, timeOption));
      }
    });
    this.Data_BTC = [
      { data: this.lineChartData_BTC, fill: true, label: 'price' }
    ];
    this.Labels_BTC = this.lineChartLabels_BTC;
  }

  public getDataETH(apiData, timeOption) {
    var stringtData = apiData.data.toString();
    var arrData = stringtData.split(",");
    arrData.forEach((element, index) => {
      if (index % 2 == 1) {
        this.lineChartData_ETH.push(element);
      } else {
        this.lineChartLabels_ETH.push(this.timeBy(element, timeOption));
      }
    });
    this.Data_ETH = [
      { data: this.lineChartData_ETH, fill: true, label: 'price' }
    ];
    this.Labels_ETH = this.lineChartLabels_ETH;
  }

  public timeBy(timestamp: string, timeOption: string) {
    return new Date(parseInt(timestamp));
  }

  //init while loading dashboard
  //Vakacoin
  public Data_VKC: Array<any> = [
    { data: this.lineChartData_VKC, fill: true, label: 'price' }
  ];
  public Labels_VKC: Array<any> = this.lineChartLabels_VKC;

  //Bitcoin
  public Data_BTC: Array<any> = [
    { data: this.lineChartData_BTC, fill: true, label: 'price' }
  ];
  public Labels_BTC: Array<any> = this.lineChartLabels_BTC;

  //ethereum
  public Data_ETH: Array<any> = [
    { data: this.lineChartData_ETH, fill: true, label: 'price' }
  ];
  public Labels_ETH: Array<any> = this.lineChartLabels_ETH;

  //chart options
  public lineChartType: string = 'line';
  public lineChartOptions: any = {
    scales: {
      xAxes: [{
        type: 'time'
      }]
    }
  }
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: '#23BF08',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  //click time options
  public timeOption(option: string): void {
    this.resetData();
    this.resetToFalse();
    switch (option) {
      case 'day':
        this.isDay = true;
        this.getDataByDay();
        break;

      case 'week':
        this.isWeek = true;
        this.getDataByWeek();
        break;

      case 'month':
        this.isMonth = true;
        this.getDataByMonth();
        break;

      case 'year':
        this.isYear = true;
        this.getDataByYear();
        break;

      case 'all':
        this.isAll = true;
        this.getAllData();
        break;

      default:
        break;
    }
  }

  public resetToFalse(): void {
    this.isDay = false;
    this.isWeek = false;
    this.isMonth = false;
    this.isYear = false;
    this.isAll = false;
  }

}
