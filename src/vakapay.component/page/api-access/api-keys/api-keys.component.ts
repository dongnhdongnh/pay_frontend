import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.css']
})
export class ApiKeysComponent implements OnInit {
  
  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  onShowModal() {
    this.ngxSmartModalService.getModal('modal').open();
  }

  ngOnInit() {
  }

}
