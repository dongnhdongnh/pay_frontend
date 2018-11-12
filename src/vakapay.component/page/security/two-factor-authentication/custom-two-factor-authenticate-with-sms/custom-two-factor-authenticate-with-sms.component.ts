import { Component, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'services/account/account.service';
import { TwofaService } from 'services/twofa/twofa.service';
import { Utility } from 'utility/Utility';
import { UtilityFormat } from 'utility/utilityFormat';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Action } from 'model/Action';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-custom-two-factor-authenticate-with-sms',
  templateUrl: './custom-two-factor-authenticate-with-sms.component.html',
  styleUrls: ['./custom-two-factor-authenticate-with-sms.component.css']
})
export class CustomTwoFactorAuthenticateWithSmsComponent {
  @ViewChild('token') tokenElement: ElementRef;
  @ViewChild('code') codeElement: ElementRef;
  @ViewChild('cancel_2_1') cancel_1_Element: ElementRef;
  @ViewChild('cancel_2_2') cancel_2_Element: ElementRef;

  level_2: string;

  //status
  isChange: boolean = false;
  isLoading: boolean = false;
  isValid: boolean = false;

  //input
  code: string = '';
  secret: string = '';

  //message error
  messageErrorToken = '';
  messageErrorCode = '';
  messageError = '';

  public qrdata: string = null;

  modalName: string = 'modalTwoFA_2';

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public accountService: AccountService,
    private service: TwofaService) {
    this.level_2 = "2";
  }

  requireSendCodePhone() {
    this.code = '';
    this.messageErrorCode = '';
    this.codeElement.nativeElement.value = '';
    this.service.requireSendCodePhone(Action.CUSTOM_TWOFA);
  }

  copySecret(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


  change() {
    this.isChange = this.level_2 !== String(this.accountService.mAccount.isTwoFactor);
  }

  onCloseModal() {
    this.cancel_1_Element.nativeElement.click();
    this.cancel_2_Element.nativeElement.click();
  }

  cancel() {
    this.secret = '';
    this.onReset();
  }

  async getSecret() {
    try {
      this.isLoading = true;
      this.messageErrorCode = '';

      UtilityValidate.validateCodePhone(this.code);

      var dataPost = {
        code: this.code
      };

      //send ajax
      let result = await this.service.getSecret(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.onReset();
        this.secret = '';
        this.qrdata = '';
        this.messageErrorCode = JSON.stringify(result);
        return;
      }

      //Get data
      this.secret = result.data;
      this.qrdata = `otpauth://totp/SecretKey?secret=${this.secret}`;
      //Reset code
      this.code = '';
      this.ngxSmartModalService.getModal('modalTwoFA_2').open();
      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      this.messageErrorCode = `We are sorry. Error occurs. ${JSON.stringify(error.message)}`;
    }
  }

  onReset() {
    //status
    this.isChange = false;
    this.isValid = false;
    this.isLoading = false;

    this.level_2 = '2';

    //custom
    this.tokenElement.nativeElement.value = '';
    this.codeElement.nativeElement.value = '';
    this.messageError = '';
    this.messageErrorToken = '';
    this.messageErrorCode = '';

    //input
    this.code = '';
    this.secret = '';
    this.qrdata = '';
  }

  validate() {
    try {
      UtilityValidate.validateCodePhone(this.code);
      if (this.level_2 === '0') {
        this.isValid = true;
        return;
      }
      //get value input
      UtilityValidate.validateToken(this.code);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onToken(event) {
    try {
      if (Utility.isEnter(event)) {
        return false;
      }

      //Get value
      this.code = Utility.getValueEventInput(event);

      UtilityValidate.validateToken(this.code);

      this.messageErrorToken = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorToken = error.message;
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
        status: UtilityFormat.getNumber(this.level_2)
      };

      //send ajax
      let result = await this.service.custom(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;
      // this.onCloseModal();
      // this.onReset();
      this.cancel_1_Element.nativeElement.click();
      this.cancel_2_Element.nativeElement.click();
      this.accountService.mAccount.isTwoFactor = dataPost.status;

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }
}
