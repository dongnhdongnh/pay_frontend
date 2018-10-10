import { CloseAccountService } from './../../../../../vakapay.services/account/close-account.service';
import { Component, Input } from '@angular/core';
import { SecurityService } from 'services/security/security.service';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';

@Component({
  selector: 'close-account-verify-password',
  templateUrl: './close-account-verify-password.component.html',
})
export class CloseAccountVerifyPasswordComponent {
  @Input() form;

  //input
  password: string;

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message
  messageErrorPassword = '';

  constructor(private closeAccountService: CloseAccountService) { }

  cancel() {
    this.form.modal.close();
  }

  requireSendCodePhone() {
    this.closeAccountService.requireSendCodePhone();
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
        password: this.password
      };

      //send ajax
      let result = await this.closeAccountService.verifyWithPassword(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.requireSendCodePhone();
      this.onReset();

      //next step
      this.form.step++;

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  onReset() {
    // this.mAccount.avatar = this.imageReset;
    // this.selectedFile = null;
    this.isValid = false;
    this.isLoading = false;
    this.isChange = false;
  }

  validate() {
    try {
      //get value input
      this.isChange = this.password !== '';
      UtilityValidate.validatePassword(this.password);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onPassword(event) {
    try {
      if (Utility.isEnter(event)) {
        this.onUpdate();
        return;
      }

      //Get value
      this.password = Utility.getValueEventInput(event);

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
