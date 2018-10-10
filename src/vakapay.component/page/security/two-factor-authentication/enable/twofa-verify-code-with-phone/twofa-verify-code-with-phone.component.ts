import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { TwofaService } from 'services/twofa/twofa.service';

@Component({
  selector: 'twofa-verify-code-with-phone',
  templateUrl: './twofa-verify-code-with-phone.component.html'
})
export class TwofaVerifyCodeComponentWithPhoneComponent {

  //#region init variable
  @Input() form;
  @ViewChild('code') codeElement: ElementRef;

  //input
  code = '';

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message error
  messageErrorCode = '';

  //service
  twofaService: TwofaService;
  //#endregion init variable

  constructor(accountService: TwofaService) {
    this.twofaService = accountService;
  }

  cancel(){
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
      let result = await this.twofaService.verifyCodeWithPhone(dataPost);

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
    // this.mAccount.avatar = this.imageReset;
    // this.selectedFile = null;
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
