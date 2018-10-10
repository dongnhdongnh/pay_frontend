import { Component } from '@angular/core';
import { TwofaService } from 'services/twofa/twofa.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'twofa-options',
  templateUrl: './twofa-options.component.html',
})
export class TwofaOptionsComponent {
  option: number;

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //service
  twofaService: TwofaService;

  constructor(accountService: TwofaService) {
    this.twofaService = accountService;
  }
  
  validate() {
    try {
      //get value input
      if ([1, 2, 3].includes(this.option) === false) {
        throw new Error(`Option is invalid.`);
      }

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  change(value) {
    this.isChange = true;
    this.option = value;
    this.validate();
  }

  reset() {
    this.isChange = false;
    this.isValid = false;
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
        option: this.option
      };

      //send ajax
      let result = await this.twofaService.updateTwofaVerifyOptions(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.reset();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }

}
