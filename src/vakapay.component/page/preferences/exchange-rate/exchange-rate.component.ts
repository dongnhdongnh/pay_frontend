import { Component, AfterViewInit } from '@angular/core';
import { RateService } from 'services/rate/rate.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements AfterViewInit {

  data: any;

  constructor(public rateService: RateService) {

  }

  ngAfterViewInit(): void {
    //this.getCurrencies();
  }

  async getCurrencies() {
    debugger;
    var data = await this.rateService.getCurrencies();
    console.log(data);
  }



}
