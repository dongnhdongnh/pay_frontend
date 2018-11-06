import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { TwofaService } from 'services/twofa/twofa.service';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { SecurityService } from 'services/security/security.service';

@Component({
  selector: 'app-disable-twofa',
  templateUrl: './disable-twofa.component.html',
  styleUrls: ['./disable-twofa.component.css']
})
export class DisableTwofaComponent {

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

  //service
  twofaService: TwofaService;
  //#endregion init variable

  constructor(
    accountService: TwofaService,
    public securityService: SecurityService
  ) {
    this.twofaService = accountService;
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
        code: this.code,
        token: this.code,
      };

      //send ajax
      let result = await this.twofaService.disable(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;
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

}
