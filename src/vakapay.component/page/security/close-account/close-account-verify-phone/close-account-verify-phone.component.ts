import { CloseAccountService } from 'services/account/close-account.service';
import { Component, Input } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';

@Component({
  selector: 'close-account-verify-phone',
  templateUrl: './close-account-verify-phone.component.html',
})
export class CloseAccountVerifyPhoneComponent {
  @Input() form;
  //input
  code = '';

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message error
  messageErrorCode = '';

  //#endregion init variable

  constructor(private closeAccountService: CloseAccountService) {
  }

  requireSendCodePhone() {
    this.closeAccountService.requireSendCodePhone();
  }

  cancel() {
    this.form.modal.close();
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
        code: this.code
      };

      //send ajax
      let result = await this.closeAccountService.verifyCodeWithPhone(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();
      this.form.modal.close();

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
