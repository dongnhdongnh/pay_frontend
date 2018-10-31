import { Component } from '@angular/core';
import { ApiKey } from 'model/api-access/ApiKey';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-show-api-key-without-twofa',
  templateUrl: './show-api-key-without-twofa.component.html',
  styleUrls: []
})
export class ShowApiKeyWithoutTwofaComponent {
  apiKey: ApiKey = new ApiKey();

  //validate
  isLoading: boolean = false;
  modalName: string = 'modalShowWithoutTwofa';

  //message
  messageError: string = '';

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public service: ApiKeyService) { }

  onShowModalWithoutTwofa() {
    this.apiKey = new ApiKey();
    this.ngxSmartModalService.getModal(this.modalName).open();
  }

  onCloseModal() {
    this.ngxSmartModalService.getModal(this.modalName).close();
  }

  cancel() {
    this.onCloseModal();
  }

  async verify() {
    try {
      this.isLoading = true;
      this.apiKey = new ApiKey();

      await Utility.sleep(1000);

      var dataPost = {
        id: this.service.currentId
      };

      //send ajax
      let result = await this.service.get(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.messageError = result.message;
        return;
      }

      if (result.data == null) {
        this.messageError = 'Not find api key';
        return;
      }

      this.messageError = '';
      this.apiKey.attributes = result.data;
      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      this.messageError = error.message;
      console.log(JSON.stringify(error));
    }
  }
}
