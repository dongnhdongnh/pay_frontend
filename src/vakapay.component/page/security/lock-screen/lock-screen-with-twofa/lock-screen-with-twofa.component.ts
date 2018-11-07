import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { LockScreenService } from 'services/lockScreen/lockScreen.service';

@Component({
  selector: 'app-lock-screen-with-twofa',
  templateUrl: './lock-screen-with-twofa.component.html',
  styleUrls: ['./lock-screen-with-twofa.component.css']
})
export class LockScreenWithTwofaComponent implements AfterViewInit {
  @ViewChild('code') codeElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;

  step: number = 1;
  password: string = '';
  code: string = '';

  //message
  messageErrorPassword: string = '';
  messageErrorCode: string = '';

  isValid: boolean = false;
  isLoading: boolean = false;
  isResendingSms: boolean = false;

  modal: any;

  account: Account;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private service: LockScreenService,
    private accountService: AccountService
  ) {
    this.account = accountService.mAccount;
  }

  ngAfterViewInit(): void {
    this.modal = this.ngxSmartModalService.getModal('modal');
  }

  showModal() {
    this.modal.open();
  }

  nextStep() {
    if (this.isValid === false) return;
    this.step = 2;
    this.isValid = false;
  }

  validate() {
    try {
      //get value input
      UtilityValidate.validateCodePhone(this.code);
      // UtilityValidate.validatePassword(this.password);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onReset() {
    this.step = 1;
    this.code = '';
    this.password = '';
    this.codeElement.nativeElement.value = '';
    this.passwordElement.nativeElement.value = '';

    //validate
    this.isLoading = false;
    this.isValid = false;

    //reset message error
    this.messageErrorCode = '';
    this.messageErrorPassword = '';
  }

  cancel() {
    this.modal.close();
    this.onReset();
  }

  async complete() {
    try {
      this.validate();
      if (this.isValid === false || this.isLoading === true) return;
      this.isLoading = true;

      var dataPost = {
        code: this.code,
        password: this.password,
        status: Number(!this.account.isLockScreen)
      };

      //send ajax
      let result = await this.service.update(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();
      this.modal.close();
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
        this.nextStep();
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

  onCode(event) {
    try {
      if (Utility.isEnter(event)) {
        this.complete();
        return;
      }

      //Get value
      this.code = Utility.getValueEventInput(event);
      UtilityValidate.validateCodePhone(this.code);
      this.messageErrorCode = '';
      this.isValid = true;
    } catch (error) {
      this.messageErrorCode = error.message;
      this.isValid = false;
    }
  }

}
