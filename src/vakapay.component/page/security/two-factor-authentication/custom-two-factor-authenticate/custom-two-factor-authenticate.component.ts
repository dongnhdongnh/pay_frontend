import { TwofaService } from 'services/twofa/twofa.service';
import { AccountService } from 'services/account/account.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { UtilityFormat } from 'utility/utilityFormat';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Action } from 'model/Action';

@Component({
  selector: 'app-custom-two-factor-authenticate',
  templateUrl: './custom-two-factor-authenticate.component.html',
  styleUrls: ['./custom-two-factor-authenticate.component.css']
})
export class CustomTwoFactorAuthenticateComponent {
  @ViewChild('token') tokenElement: ElementRef;
  @ViewChild('code') codeElement: ElementRef;
  @ViewChild('cancel_0') cancelElement: ElementRef;
  @ViewChild('cancel_0_2') cancel_2_Element: ElementRef;

  level_0: string;

  //status
  isChange: boolean = false;
  isLoading: boolean = false;
  isGetting: boolean = false;
  isValid: boolean = false;

  //input
  code: string = '';
  secret: string = '';

  //message error
  messageErrorToken = '';
  messageErrorCode = '';
  messageError = '';

  public qrdata: string = null;

  constructor(
    public accountService: AccountService,
    private service: TwofaService) {
    this.level_0 = "0";
  }

  requireSendCodePhone() {
    this.service.requireSendCodePhone(Action.CUSTOM_TWOFA);
  }

  copySecret(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


  change() {
    this.isChange = this.level_0 !== String(this.accountService.mAccount.isTwoFactor);
  }

  onCloseModal() {
    this.cancelElement.nativeElement.click();
    this.cancel_2_Element.nativeElement.click();
  }

  cancel() {
    this.onReset();
  }

  async getSecret() {
    try {
      if (this.secret !== '') return;

      this.isGetting = true;
      var dataPost = {};

      //send ajax
      let result = await this.service.getSecret(dataPost);

      //Show message success
      this.isGetting = false;

      if (Utility.isError(result)) {
        this.secret = '';
        this.qrdata = '';
        this.messageError = JSON.stringify(result);
        return;
      }

      //Get data
      this.secret = result.data;
      this.qrdata = `otpauth://totp/SecretKey?secret=${this.secret}`;
      return;
    } catch (error) {
      //Show message success
      this.isGetting = false;
      this.messageError = `We are sorry. Error occurs. ${JSON.stringify(error.message)}`;
    }
  }

  onReset() {
    //status
    this.isChange = false;
    this.isValid = false;
    this.isLoading = false;
    this.isGetting = false;

    this.level_0 = '0';

    //custom
    this.tokenElement.nativeElement.value = '';
    this.codeElement.nativeElement.value = '';
    this.messageError = '';
    this.messageErrorToken = '';

    //input
    this.code = '';
    this.secret = '';
    this.qrdata = '';
  }

  validate() {
    try {
      if (this.level_0 === '2') {
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
        status: UtilityFormat.getNumber(this.level_0)
      };

      //send ajax
      let result = await this.service.custom(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;
      this.onCloseModal();
      this.accountService.mAccount.isTwoFactor = dataPost.status;

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }
}
