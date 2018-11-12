import { UtilityFormat } from 'utility/utilityFormat';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Account } from 'model/account/Account';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AccountService } from 'services/account/account.service';
import { TwofaOptionService } from 'services/twofa/twofa-option.service';
import { UtilityValidate } from 'utility/UtilityValidate';
import { Utility } from 'utility/Utility';
import { TwofaService } from 'services/twofa/twofa.service';
import { Action } from 'model/Action';
import { SecurityService } from 'services/security/security.service';

@Component({
  selector: 'twofa-options',
  templateUrl: './twofa-options.component.html',
  styleUrls: ['./twofa-options.component.css']

})
export class TwofaOptionsComponent implements AfterViewInit {
  @ViewChild('code') codeElement: ElementRef;

  mAccount: Account;

  //input
  code = '';

  option: string = '1';

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message error
  messageErrorCode = '';

  //modal
  modal: any = {};
  modalName: string = 'modalTwofaOptions';

  constructor(public ngxSmartModalService: NgxSmartModalService,
    accountService: AccountService,
    public securityService: SecurityService,
    private twofaOptionService: TwofaOptionService,
    private service: TwofaService) {
    this.mAccount = accountService.mAccount;
  }

  ngAfterViewInit() {
    this.modal = this.ngxSmartModalService.getModal(this.modalName);
    this.loadOption();
  }

  async loadOption() {
    while (this.securityService.isLoading === true) {
      await Utility.sleep(100);
    }
    this.option = this.securityService.twofaOption;
  }

  validate() {
    try {
      //get value input
      if (['1', '2', '3'].includes(this.option) === false) {
        throw new Error(`Option is invalid.`);
      }

      //get value input
      this.isChange = this.code !== '';
      UtilityValidate.validateCodePhone(this.code);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  change(value) {
    this.isChange = true;
    this.option = value;
  }

  reset() {
    this.isChange = false;
    this.isValid = false;
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

  requireSendCodePhone() {
    this.onReset();
    this.service.requireSendCodePhone(Action.UPDATE_OPTION_VETIFY);
  }

  cancel() {
    this.modal.close();
    this.onReset(true);
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
        option: UtilityFormat.getNumber(this.option),
        code: this.code
      };

      //send ajax
      let result = await this.twofaOptionService.update(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.securityService.twofaOption = this.option;
      this.onReset();
      this.modal.close();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

  onReset(isResetOption: boolean = false) {
    if (isResetOption) this.option = this.securityService.twofaOption;
    this.isValid = false;
    this.isLoading = false;
    this.isChange = false;

    //custom
    this.isValid = false;
    this.isChange = false;
    this.messageErrorCode = '';
    this.codeElement.nativeElement.value = '';
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
