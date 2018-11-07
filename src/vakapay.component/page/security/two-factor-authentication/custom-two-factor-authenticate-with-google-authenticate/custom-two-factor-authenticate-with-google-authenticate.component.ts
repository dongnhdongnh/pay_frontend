import { Component, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { TwofaService } from 'services/twofa/twofa.service';
import { UtilityFormat } from 'utility/utilityFormat';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Action } from 'model/Action';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-custom-two-factor-authenticate-with-google-authenticate',
  templateUrl: './custom-two-factor-authenticate-with-google-authenticate.component.html',
  styleUrls: ['./custom-two-factor-authenticate-with-google-authenticate.component.css']
})
export class CustomTwoFactorAuthenticateWithGoogleAuthenticateComponent {
  @ViewChild('code') codeElement: ElementRef;
  @ViewChild('code_sms') codeSmsElement: ElementRef;
  @ViewChild('cancel_1') cancelElement: ElementRef;
  @ViewChild('cancel_1_2') cancel_2_Element: ElementRef;

  //input
  code = '';
  code_sms = '';

  level: string = '1';

  //status
  isChange: boolean = false;
  isLoading: boolean = false;
  isValid: boolean = false;

  //message error
  messageErrorCode = '';
  messageErrorCode_Sms = '';

  //modal
  modalName: string = 'modalTwoFA_1_sms';

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public accountService: AccountService,
    private service: TwofaService) {
  }

  async requireSendCodePhone() {
    try {
      this.code_sms = '';
      this.messageErrorCode_Sms = '';
      this.codeSmsElement.nativeElement.value = '';

      this.isLoading = true;

      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      //send ajax
      let result = await this.service.requireSendCodePhone(Action.CUSTOM_TWOFA, this.code);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.messageErrorCode = result.message;
        return;
      }

      this.cancelElement.nativeElement.click();
      this.ngxSmartModalService.getModal(this.modalName).open();
      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }

  }

  onCloseModal() {
    this.cancelElement.nativeElement.click();
    this.cancel_2_Element.nativeElement.click();
  }

  change() {
    this.isChange = this.level !== String(this.accountService.mAccount.isTwoFactor);
  }

  cancel() {
    this.onReset();
  }


  onReset(resetLevel: boolean = true) {
    if (resetLevel) this.level = "1";
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
        // this.onUpdate();
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

  async onUpdate() {
    try {
      this.isLoading = true;

      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        code: this.code,
        token: this.code,
        status: UtilityFormat.getNumber(this.level)
      };

      //send ajax
      let result = await this.service.custom(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onCloseModal();
      this.onReset();
      this.accountService.mAccount.isTwoFactor = dataPost.status;
      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

}
