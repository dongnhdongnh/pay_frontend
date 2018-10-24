import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { CloseAccountService } from 'services/account/close-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'close-account-verify-phone',
  templateUrl: './close-account-verify-phone.component.html',
})

export class CloseAccountVerifyPhoneComponent {
  @ViewChild('code') codeElement: ElementRef;
  @Input() form;
  //input
  code: string;

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message error
  messageErrorCode = '';

  //#endregion init variable

  constructor(
    private closeAccountService: CloseAccountService,
    private router: Router,) {
  }

  requireSendCodePhone() {
    this.closeAccountService.requireSendCodePhone();
    this.onReset();
  }

  cancel() {
    this.form.modal.close();
    this.onReset();
    this.form.step = 1;
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
        code: this.code,
        password: this.form.password
      };

      //send ajax
      let result = await this.closeAccountService.verifyCodeWithPhone(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();
      this.form.step = 1;
      this.form.modal.close();

      //logout
      this.router.navigate(['/logout']);

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  onReset() {
    this.isValid = false;
    this.isLoading = false;
    this.isChange = false;
    //custom
    this.messageErrorCode = '';
    this.codeElement.nativeElement.value = '';
  }

  validate() {
    try {
      //get value input
      this.isChange = this.code !== '';
      UtilityValidate.validateCodePhone(this.code);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onCode(event) {
    try {
      if (Utility.isEnter(event)) {
        this.onUpdate();
        return;
      }

      //Get value
      this.code = Utility.getValueEventInput(event);

      UtilityValidate.validateCodePhone(this.code);

      this.messageErrorCode = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorCode = error.message;
      this.isValid = false;
    }
  }
}
