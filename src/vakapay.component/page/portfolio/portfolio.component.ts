import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'model/portfolio/Portfolio';
import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  account: Account;
  configService: ConfigService;
  private apiUrl = '';

  constructor(accountService: AccountService, private httpService: HttpService, configService: ConfigService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi;
    this.account = accountService.mAccount;
  }

  ngOnInit() {
    var p = new Portfolio('Vakacoin', '20', '100', '500');
    this.portfolio.push(p);
  }

  portfolio: Portfolio[] = [];

  public async getData(apiString = '') {
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);
    var stringtData = apiData.data.toString();
  }

  // Doughnut
  public doughnutChartLabels: string[] = ['Vakacoin', 'Bitcoin', 'Ethereum', 'Eosio'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
