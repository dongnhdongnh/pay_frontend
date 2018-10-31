import { Component, OnInit } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
@Component({
  selector: 'app-portfolio-value',
  templateUrl: './portfolio-value.component.html',
  styleUrls: ['./portfolio-value.component.css']
})
export class PortfolioValueComponent implements OnInit {
  configService: ConfigService;
  portfolioValue: any;
  private apiUrl = '';

  // public lineChartColors: any;
  public chartData = [];
  public chartLabel = [];

  // public lineChartColors: any;
  // public lineChartLegend: any;

  constructor(private httpService: HttpService, configService: ConfigService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/portfolio/value/';
  }

  ngOnInit() {
    this.getData('hour');
  }

  public async getData(apiString = '') {
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);

    // if (Utility.isError) throw new Error(apiData.message);
    var objectData = apiData.data;

    objectData.forEach(element => {
      var value = (Number(element["BitcoinValue"]) + Number(element["EthereumValue"]) + Number(element["VakacoinValue"])).toFixed(3);
      var time = new Date(parseInt(element["Timestamp"] + "000"));
      this.chartData.push(value);
      this.chartLabel.push(time);
      this.portfolioValue = "$ " + value;
    });

    this.lineChartData = [{ data: this.chartData, label: 'Portfolio Value' }];
    this.lineChartLabels = this.chartLabel;
  }

  isHour = true;
  isDay = false;
  isWeek = false;
  isMonth = false;
  isYear = false;
  isAll = false;

  public lineChartData: Array<any> = [
    { data: this.chartData, label: 'Portfolio Value' }
  ];
  public lineChartLabels: Array<any> = this.chartLabel;
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

  public resetToFalse(): void {
    this.isHour = false;
    this.isDay = false;
    this.isWeek = false;
    this.isMonth = false;
    this.isYear = false;
    this.isAll = false;
  }

  public resetData(): void {
    this.chartData = [];
    this.chartLabel = [];
  }

  public timeOption(option: string): void {
    this.resetData();
    this.resetToFalse();
    switch (option) {
      case 'hour':
        this.isHour = true;
        this.getData(option);
        break;

      case 'day':
        this.isDay = true;
        this.getData(option);
        break;

      case 'week':
        this.isWeek = true;
        this.getData(option);
        break;

      case 'month':
        this.isMonth = true;
        this.getData(option);
        break;

      case 'year':
        this.isYear = true;
        this.getData(option);
        break;

      case 'all':
        this.isAll = true;
        this.getData(option);
        break;

      default:
        break;
    }
  }

}
