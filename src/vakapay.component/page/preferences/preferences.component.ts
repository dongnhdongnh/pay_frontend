import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Root } from 'component/root/root.component';
import { AccountService } from 'services/account/account.service';
import { Account } from 'model/account/Account';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent extends Root implements OnInit {
  mAccount: Account;
  
  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    mAccountSerive: AccountService,
  ) {
    super(titleService, route, router);
    this.mAccount = mAccountSerive.mAccount;
  }

  ngOnInit() {
  }
}
