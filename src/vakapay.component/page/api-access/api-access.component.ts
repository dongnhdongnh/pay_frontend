import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-access',
  templateUrl: './api-access.component.html',
  styleUrls: ['./api-access.component.css']
})
export class ApiAccessComponent implements OnInit {
  selectedIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
