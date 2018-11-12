import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-enable-api-key-without-twofa',
  templateUrl: './enable-api-key-without-twofa.component.html',
  styleUrls: ['./enable-api-key-without-twofa.component.css']
})
export class EnableApiKeyWithoutTwofaComponent {

  @ViewChild('cancel') cancelElement: ElementRef;

  //message
  messageError: string = '';

  //validate
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(public service: ApiKeyService) { }

  cancel() {
    this.cancelElement.nativeElement.click();
  }

  async verify() {
    try {
      this.isLoading = true;

      var dataPost = {
        id: this.service.currentId
      };

      //send ajax
      let result = await this.service.enable(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        this.messageError = result.message;
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
}
