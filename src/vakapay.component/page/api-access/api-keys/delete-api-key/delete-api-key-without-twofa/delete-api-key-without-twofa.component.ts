import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-delete-api-key-without-twofa',
  templateUrl: './delete-api-key-without-twofa.component.html',
  styleUrls: ['./delete-api-key-without-twofa.component.css']
})
export class DeleteApiKeyWithoutTwofaComponent {
  @ViewChild('cancel') cancelElement: ElementRef;

  //message
  messageError: string = '';

  //validate
  isLoading: boolean = false;

  constructor(
    public service: ApiKeyService
  ) {
  }

  onCloseModal() {
    this.cancelElement.nativeElement.click();
  }

  async verify() {
    try {
      this.isLoading = true;

      var dataPost = {
        id: this.service.currentId
      };

      //send ajax
      let result = await this.service.delete(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.messageError = result.message;
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
