import { Component, ViewChild, ElementRef } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { LockScreenService } from 'services/lockScreen/lockScreen.service';

@Component({
  selector: 'app-lock-screen-without-twofa',
  templateUrl: './lock-screen-without-twofa.component.html',
  styleUrls: ['./lock-screen-without-twofa.component.css']
})
export class LockScreenWithoutTwofaComponent {

  @ViewChild('password') passwordElement: ElementRef;
  @ViewChild('cancel') cancelElement: ElementRef;

  step: number = 1;
  password: string = '';

  //message
  messageErrorPassword: string = '';

  isValid: boolean = false;
  isLoading: boolean = false;

  account: Account;

  constructor(
    private service: LockScreenService,
    private accountService: AccountService
  ) {
    this.account = accountService.mAccount;
  }

  validate() {
    try {
      //get value input
      UtilityValidate.validatePassword(this.password);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onReset() {
    this.step = 1;
    this.password = '';
    this.passwordElement.nativeElement.value = '';

    //validate
    this.isLoading = false;
    this.isValid = false;

    //reset message error
    this.messageErrorPassword = '';
  }

  onCloseModal() {
    this.cancelElement.nativeElement.click();
  }

  cancel() {
    this.onCloseModal();
    this.onReset();
  }

  async complete() {
    try {
      this.validate();
      if (this.isValid === false || this.isLoading === true) return;
      this.isLoading = true;

      var dataPost = {
        password: this.password,
        status: Number(!this.account.isLockScreen)
      };

      //send ajax
      let result = await this.service.update(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();
      this.onCloseModal();
      this.account.isLockScreen = Number(!this.account.isLockScreen);

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  onPassword(event: any) {
    try {
      if (Utility.isEnter(event)) {
        return;
      }

      //Get value
      this.password = Utility.getValueEventInput(event);

      //Validate password
      UtilityValidate.require(this, ['password']);
      UtilityValidate.validatePassword(this.password);
      this.isValid = true;
      this.messageErrorPassword = '';
    } catch (error) {
      this.isValid = false;
      this.messageErrorPassword = error.message;
    }
  }
}
