import { AccountService } from 'services/account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mAccount: any;
  mAccountSerive: any;
  constructor(mAccountSerive: AccountService) {
    this.mAccountSerive = mAccountSerive;
  }

  ngOnInit() {
    this.mAccount = this.mAccountSerive.mAccount || {};
  }

}
