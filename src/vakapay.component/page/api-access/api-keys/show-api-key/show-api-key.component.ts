import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiKey } from 'model/api-access/ApiKey';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';

@Component({
  selector: 'app-show-api-key',
  templateUrl: './show-api-key.component.html',
  styleUrls: ['./show-api-key.component.css']
})
export class ShowApiKeyComponent {
  @ViewChild('code') codeElement: ElementRef;

  //input
  code: string = '';
  apiKey: ApiKey = new ApiKey();

  //message
  messageErrorCode: string = '';

  //validate
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private service: ApiKeyService) { }

  onShowModal() {
    this.apiKey = new ApiKey();
    this.ngxSmartModalService.getModal('modalShowVerify').open();
  }

  show(data: any = {}) {
    this.apiKey.attributes = data;
    this.ngxSmartModalService.getModal('modalShow').open();
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


  onCloseModal() {
    this.ngxSmartModalService.getModal('modalShowVerify').close();
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
      this.apiKey = new ApiKey();
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
      let result = await this.service.get(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.messageErrorCode = result.message;
        return;
      }

      if (result.data == null) {
        this.messageErrorCode = 'Not find api key';
        return;
      }

      this.onCloseModal();
      this.onReset();

      //show info
      this.show(result.data);

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
