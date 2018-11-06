import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { TwofaService } from 'services/twofa/twofa.service';
import { SecurityService } from 'services/security/security.service';

@Component({
  selector: 'app-enable-twofa-without-phone',
  templateUrl: './enable-twofa-without-phone.component.html',
  styleUrls: ['./enable-twofa-without-phone.component.css']
})
export class EnableTwofaWithoutPhoneComponent {

  @ViewChild('token') tokenElement: ElementRef;

  //#region init variable
  @Input() form;

  step: number = 1;

  //input
  token: string = '';
  secret: string = '';

  //status
  isLoading = false;
  isGetting = false;
  isValid = false;

  //message error
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

  async getSecret() {
    try {
      if (this.secret !== '') return;
      this.isGetting = true;
      this.step = 1;     

      var dataPost = {};

      //send ajax
      let result = await this.twofaService.getSecret(dataPost);

      //Show message success
      this.isGetting = false;

      if (Utility.isError(result)) return;

      //Get data
      this.secret = result.data;
      this.qrdata = `otpauth://totp/SecretKey?secret=${this.secret}`

      this.onReset();

      return;
    } catch (error) {
      //Show message success
      this.isGetting = false;
      console.log(JSON.stringify(error));
    }
  }

  cancel() {
    debugger;
    // this.form.modal.close();
    this.step = 1;
    this.onReset();
  }

  async onUpdate() {
    try {
      this.isLoading = true;
      this.step = 1;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        token: this.token
      };

      //send ajax
      let result = await this.twofaService.custom(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.step++;
      this.securityService.isEnableTwofa = !this.securityService.isEnableTwofa;
      this.secret = '';
      this.onReset();

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
    this.tokenElement.nativeElement.value = '';
  }

  validate() {
    try {
      //get value input
      UtilityValidate.validateToken(this.token);

      this.isValid = true;
    } catch (error) {
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
