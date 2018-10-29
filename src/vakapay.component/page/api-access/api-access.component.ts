import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from 'services/api-access/apiAccess.service';

@Component({
  selector: 'app-api-access',
  templateUrl: './api-access.component.html',
  styleUrls: ['./api-access.component.css']
})
export class ApiAccessComponent implements OnInit {
  selectedIndex: number = 1;

  constructor(apiAccessService: ApiAccessService) {
    apiAccessService.getInfo();
  }

  ngOnInit() {
  }

  changeTab(value) {
    this.selectedIndex = value;
  }

}
