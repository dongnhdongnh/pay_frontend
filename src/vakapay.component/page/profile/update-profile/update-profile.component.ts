import { AccountService } from 'services/account/account.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Account } from 'model/account/Account';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';

@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent {

  @Input() mAccount: Account;
  @ViewChild('streetAddress1Element') streetAddress1Element: ElementRef;
  @ViewChild('streetAddress2Element') streetAddress2Element: ElementRef;
  @ViewChild('cityElement') cityElement: ElementRef;
  @ViewChild('postalCodeElement') postalCodeElement: ElementRef;

  //input
  streetAddress1 = '';
  streetAddress2 = '';
  city = '';
  postalCode = '';

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message
  messageError = '';
  messageErrorStreetAddress1 = '';
  messageErrorStreetAddress2 = '';
  messageErrorCity = '';
  messageErrorPostalCode = '';

  //service
  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
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
        streetAddress1: this.streetAddress1,
        streetAddress2: this.streetAddress2,
        city: this.city,
        postalCode: this.postalCode
      }

      //send ajax
      let result = await this.accountService.updateProfile(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      //Change mAccount with new data
      this.mAccount.attributes = dataPost;
      this.onReset();

      return;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  onReset() {
    // this.mAccount.avatar = this.imageReset;
    // this.selectedFile = null;
    this.isValid = false;
    this.isLoading = false;
    this.isChange = false;
  }

  validate() {
    try {
      //get value input
      !this.streetAddress1 && (this.streetAddress1 = Utility.getInputValue(this.streetAddress1Element));
      !this.streetAddress2 && (this.streetAddress2 = Utility.getInputValue(this.streetAddress2Element));
      !this.city && (this.city = Utility.getInputValue(this.cityElement));
      !this.postalCode && (this.postalCode = Utility.getInputValue(this.postalCodeElement));

      this.isChange =
        this.streetAddress1 != this.mAccount.streetAddress1 ||
        this.streetAddress2 != this.mAccount.streetAddress2 ||
        this.city != this.mAccount.city ||
        this.postalCode != this.mAccount.postalCode;

      //validate
      this.streetAddress1 && UtilityValidate.validateStreet(this.streetAddress1);
      this.streetAddress2 && UtilityValidate.validateStreet(this.streetAddress2);
      this.city && UtilityValidate.validateCity(this.city);
      this.postalCode && UtilityValidate.validatePostalCode(this.postalCode);

      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  onStreetAddress1(event) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.streetAddress2Element);
        return;
      }

      //Get value
      this.streetAddress1 = Utility.getValueEventInput(event);

      UtilityValidate.validateStreet(this.streetAddress1);

      this.messageErrorStreetAddress1 = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorStreetAddress1 = error.message;
      this.isValid = false;
    }
  }

  onStreetAddress2(event) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.cityElement);
        return;
      }

      //Get value
      this.streetAddress2 = Utility.getValueEventInput(event);

      UtilityValidate.validateStreet(this.streetAddress2);

      this.messageErrorStreetAddress2 = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorStreetAddress2 = error.message;
      this.isValid = false;
    }
  }

  onCity(event) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.postalCodeElement);
        return;
      }

      //Get value
      this.city = Utility.getValueEventInput(event);

      //Validate lastName
      UtilityValidate.validateCity(this.city);

      this.messageErrorCity = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorCity = error.message;
      this.isValid = false;
    }
  }

  onPostalCode(event) {
    try {
      if (Utility.isEnter(event)) {
        this.onUpdate();
        return;
      }

      //Get value
      this.postalCode = Utility.getValueEventInput(event);

      //Validate lastName
      UtilityValidate.validatePostalCode(this.postalCode);

      this.messageErrorPostalCode = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorPostalCode = error.message;
      this.isValid = false;
    }
  }
}
