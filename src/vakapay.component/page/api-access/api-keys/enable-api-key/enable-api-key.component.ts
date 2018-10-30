import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';

@Component({
  selector: 'app-enable-api-key',
  templateUrl: './enable-api-key.component.html',
  styleUrls: ['./enable-api-key.component.css']
})
export class EnableApiKeyComponent {

  @ViewChild('code') codeElement: ElementRef;

  //input
  code: string = '';
  idEnable: string = '';

  //message
  messageErrorCode: string = '';

  //validate
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public service: ApiKeyService
  ) {
  }

  onShowModalVerifyEnable() {
    console.log(this.ngxSmartModalService);
    this.ngxSmartModalService.getModal("modalVerifyEnable").open();
  }

  showModalEnable() {
    this.idEnable = this.service.currentId;
    this.ngxSmartModalService.getModal('modalVerifyEnable').close();
    this.ngxSmartModalService.getModal('modalEnable').open();
  }

  onCloseModal() {
    this.ngxSmartModalService.getModal('modalVerifyEnable').close();
    this.ngxSmartModalService.getModal('modalEnable').close();
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
    this.onCloseModal();
    this.onReset();
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
        id: this.idEnable
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

      this.onCloseModal();
      this.onReset();

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
