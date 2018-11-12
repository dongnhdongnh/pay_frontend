import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Account } from 'model/account/Account';
import { TwofaService } from 'services/twofa/twofa.service';
import { Action } from 'model/Action';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-enable-api-key-with-twofa',
  templateUrl: './enable-api-key-with-twofa.component.html',
  styleUrls: ['./enable-api-key-with-twofa.component.css']
})
export class EnableApiKeyWithTwofaComponent {

  @ViewChild('code') codeElement: ElementRef;
  @ViewChild('cancel') cancelElement: ElementRef;

  //modal
  modalName: string = 'modalEnable';

  //input
  code: string = '';

  //message
  messageErrorCode: string = '';

  mAccount: Account;

  //validate
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(
    public service: ApiKeyService,
    private accountService: AccountService,
    private twofaService: TwofaService,
  ) {
    this.mAccount = accountService.mAccount;
  }

  requireSendCodePhone() {
    this.onReset();
    this.twofaService.requireSendCodePhone(Action.API_ACCESS_SATUS);
  }

  onCode(event) {
    try {
      if (Utility.isEnter(event)) {
        // this.onUpdate();
        return;
      }

      //Get value
      this.code = Utility.getValueEventInput(event);

      UtilityValidate.validateToken(this.code);

      this.messageErrorCode = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorCode = error.message;
      this.isValid = false;
    }
  }

  cancel() {
    this.cancelElement.nativeElement.click();
  }

  validate() {
    try {
      this.isValid = false;
      UtilityValidate.validateToken(this.code);
      this.isValid = true;
    } catch (error) {
      this.isValid = false;
      console.log(error.message);
    }
  }

  async verify() {
    try {
      this.isLoading = true;
      this.validate();

      if (this.isValid === false) {
        this.isLoading = false;
        return;
      }

      var dataPost = {
        code: this.code,
        id: this.service.currentId
      };

      //send ajax
      let result = await this.service.enable(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.messageErrorCode = result.message;
        return;
      }

      this.service.refresh();

      this.cancel();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  onReset() {
    //valid
    this.isValid = false;

    //input
    this.codeElement.nativeElement.value = '';

    //message
    this.messageErrorCode = '';
  }
}
