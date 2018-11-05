import { LockScreenService } from 'services/lockScreen/lockScreen.service';
import { AccountService } from 'services/account/account.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Account } from 'model/account/Account';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Router } from '@angular/router';

@Component({
  selector: 'lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.css']
})
export class LockScreenComponent {
  @ViewChild('password') passwordElement: ElementRef;

  //input
  password: string = '';

  //message error
  messageErrorPassword = '';

  //validate
  isValid = false;

  //Loading
  isLoading = false;

  mAccount: Account;

  constructor(
    private accountService: AccountService,
    private lockScreenService: LockScreenService,
    private router: Router
  ) {
    this.mAccount = accountService.mAccount;
  }

  async onUnlock() {
    try {
      this.isLoading = true;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        password: this.password
      }

      //send ajax
      let result = await this.lockScreenService.unlock(dataPost);

      //Show message success
      this.isLoading = false;

      //Check result
      if (Utility.isError(result)) return;

      //set unlock success
      this.accountService.isCheckLock = true;

      let currentRouter = this.accountService.currentRouter;
      let link = ['/account-is-lock', '/'].includes(currentRouter) ? 'dashboard' : currentRouter;
      return this.router.navigate([link]);
    } catch (error) {
      this.isLoading = false;
    }
  }

  validate() {
    try {
      UtilityValidate.require(this, ['password']);

      UtilityValidate.validatePassword(this.password);

      this.isValid = true;
      this.messageErrorPassword = '';

      return true;
    } catch (error) {
      this.isValid = false;
      this.messageErrorPassword = error.message;

      return false;
    }
  }


  onPassword(event: any) {
    try {
      if (Utility.isEnter(event)) {
        this.onUnlock();
        return;
      }

      //Get value
      this.password = Utility.getValueEventInput(event);

      //Validate password
      UtilityValidate.require(this, ['password']);
      UtilityValidate.validatePassword(this.password);

      this.messageErrorPassword = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorPassword = error.message;
      this.isValid = false;
    }
  }

}
