import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-value',
  templateUrl: './portfolio-value.component.html',
  styleUrls: ['./portfolio-value.component.css']
})
export class PortfolioValueComponent implements OnInit {
  
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 100], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
