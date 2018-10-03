import { Component, OnInit } from '@angular/core';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mAccount: any;
  mAccountSerive: any;
  constructor(mAccountSerive: AccountService) {
    this.mAccountSerive = mAccountSerive;
  }

  ngOnInit() {
    this.mAccount = this.mAccountSerive.mAccount || {};
  }
}
