import { ResultObject } from './../../../../vakapay.model/result/ResultObject';
import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() mAccount: Account;

  //status
  isChange = false;
  isLoading = false;
  isValid = false;

  //service
  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  ngOnInit() {
  }

  validate() {
    let data = this.mAccount.notifications.join('').trim();
    this.isValid = !data || /^[1-3]+$/.test(data);
  }

  async onUpdate() {
    try {
      if (this.isChange === false) return;
      this.isLoading = true;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        notifications: this.mAccount.notifications.join(','),
      };

      //send ajax
      let result: ResultObject = await this.accountService.updateNotifications(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();

      return;
    } catch (error) {
      this.isLoading = false;
    }
  }

  onReset() {
    this.isValid = false;
    this.isLoading = false;
    this.isChange = false;
  }

  toggleNotifications(value) {
    if (this.mAccount.notifications.includes(value)) {
      Utility.removeElement(this.mAccount.notifications, value);
      return;
    }
    this.mAccount.notifications.push(value);
  }

  onChange1() {
    this.isChange = true;
    this.toggleNotifications('1');
    this.validate();

  }

  onChange2() {
    this.isChange = true;
    this.toggleNotifications('2');
    this.validate();
  }

  onChange3() {
    this.isChange = true;
    this.toggleNotifications('3');
    this.validate();
  }

}
