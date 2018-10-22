import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { TwofaService } from 'services/twofa/twofa.service';
import { SecurityService } from 'services/security/security.service';

@Component({
  selector: 'app-enable-twofa',
  templateUrl: './twofa-verify-code-with-phone.component.html'
})
export class TwofaVerifyCodeComponentWithPhoneComponent {
  @ViewChild('code') codeElement: ElementRef;
  @ViewChild('token') tokenElement: ElementRef;

  //#region init variable
  @Input() form;

  step: number = 1;

  //input
  code = '';
  token: string = '';
  secret: string = '';

  //status
  isLoading = false;
  isValid = false;

  //message error
  messageErrorCode = '';
  messageErrorToken = '';

  //service
  twofaService: TwofaService;
  //#endregion init variable

  public qrdata: string = null;

  constructor(
    accountService: TwofaService,
    public securityService: SecurityService
  ) {
    this.step = 1;
    this.twofaService = accountService;
    this.qrdata = 'Your QR code data string';
  }

  requireSendCodePhone() {
    this.onReset();
    this.twofaService.requireSendCodePhone(!this.securityService.isEnableTwofa);
  }

  cancel() {
    this.form.modal.close();
     this.step = 1;
    this.onReset();
  }

  async verifySms() {
    try {
      this.isLoading = true;
      this.step = 1;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        code: this.code
      };

      //send ajax
      let result = await this.twofaService.verifySms(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      //Get data
      this.secret = result.data;
      this.qrdata = `otpauth://totp/SecretKey?secret=${this.secret}`

      // this.securityService.isEnableTwofa = !this.securityService.isEnableTwofa;
      this.step++;
      this.onReset();
      // this.form.modal.close();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  async onUpdate() {
    try {
      this.isLoading = true;
      this.step = 2;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        code: this.code,
        token: this.token
      };

      //send ajax
      let result = await this.twofaService.enable(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.step++;
      this.securityService.isEnableTwofa = !this.securityService.isEnableTwofa;
      this.onReset();
      this.form.modal.close();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  copySecret(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  onReset() {
    this.isValid = false;
    this.isLoading = false;

    //custom
    this.messageErrorCode = '';
    this.codeElement.nativeElement.value = '';
    this.tokenElement.nativeElement.value = '';
  }

  validate() {
    try {
      //get value input
      UtilityValidate.validateCodePhone(this.code);

      if (this.step > 1) {
        UtilityValidate.validateToken(this.token);
      }

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onCode(event) {
    try {
      if (Utility.isEnter(event)) {
        // this.onUpdate();
        return false;
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

  onToken(event) {
    try {
      if (Utility.isEnter(event)) {
        // this.onUpdate();
        return false;
      }

      //Get value
      this.token = Utility.getValueEventInput(event);

      UtilityValidate.validateToken(this.token);

      this.messageErrorToken = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorToken = error.message;
      this.isValid = false;
    }
  }

}
