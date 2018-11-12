import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-disable-api-key-without-twofa',
  templateUrl: './disable-api-key-without-twofa.component.html',
  styleUrls: ['./disable-api-key-without-twofa.component.css']
})
export class DisableApiKeyWithoutTwofaComponent {
  //modal
  modalName: string = 'modalVerifyDisableWithoutTwofa';

  //validate
  isLoading: boolean = false;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public service: ApiKeyService) { }

  onShowModalDisable() {
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

      while (this.service.currentId === '') {
        await Utility.sleep(100);
      }

      var dataPost = {
        id: this.service.currentId
      };

      //send ajax
      let result = await this.service.disable(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        return;
      }

      this.service.refresh();

      this.onCloseModal();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

}
