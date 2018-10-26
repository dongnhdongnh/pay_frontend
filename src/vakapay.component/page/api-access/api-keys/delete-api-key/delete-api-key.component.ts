import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';

@Component({
  selector: 'app-delete-api-key',
  templateUrl: './delete-api-key.component.html',
  styleUrls: ['./delete-api-key.component.css']
})
export class DeleteApiKeyComponent {
  @ViewChild('code') codeElement: ElementRef;

  //input
  code: string = '';
  idDelete: string = '';

  //message
  messageErrorCode: string = '';

  //validate
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private service: ApiKeyService
  ) {
  }



  onShowModal() {
    this.ngxSmartModalService.getModal('modal').open();
  }

  showModalDelete() {
    this.idDelete = this.service.currentId;
    this.ngxSmartModalService.getModal('modal').close();
    this.ngxSmartModalService.getModal('modalDelete').open();
    this.service.currentId = '';
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
    this.ngxSmartModalService.getModal('modal').close();
    this.ngxSmartModalService.getModal('modalDelete').close();
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
        id: this.idDelete
      };

      //send ajax
      let result = await this.service.delete(dataPost);

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
