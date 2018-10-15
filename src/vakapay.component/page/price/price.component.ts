import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  data = localStorage['bitcoinByDay'] || [];

  public lineChartData:Array<any> = [
    {data : this.data.price, label: 'Series A', fill: false}
  ];
  public lineChartLabels:Array<any> = this.data.timestamp;
  public lineChartType:string = 'line';

  public lineChartOptions:any = {
    fill: false
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: '#23BF08',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    
  ];

  constructor() {
   }

  ngOnInit() {
  }

}
