import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { TwofaOptionService } from 'services/twofa/twofa-option.service';

@Component({
  selector: 'twofa-options-verify-with-phone',
  templateUrl: './twofa-options-verify-with-phone.component.html',
})
export class TwofaOptionsVerifyWithPhoneComponent {

  @ViewChild('code') codeElement: ElementRef;
  //#region init variable
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

  constructor(private twofaOptionService: TwofaOptionService) {
  }

  requireSendCodePhone() {
    this.onReset();
    this.twofaOptionService.requireSendCodePhone();
  }

  cancel() {
    this.form.modal.close();
    this.onReset();
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
        option: this.form.option,
        code: this.code
      };

      //send ajax
      let result = await this.twofaOptionService.update(dataPost);

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

    //custom
    this.form.isValid = false;
    this.form.isChange = false;
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
