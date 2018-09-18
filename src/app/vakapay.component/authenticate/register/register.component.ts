import { Component, OnInit } from '@angular/core';
import { Root } from '../../root/root.component';
import { ToasterService } from 'angular2-toaster';

import { Register } from '../../../vakapay.model/authenticate/Register';
import { Utility } from '../../../vakapay.core/vakapay.utility/Utility';
import { UtilityValidate } from '../../../vakapay.core/vakapay.utility/UtilityValidate';
import { RegisterService } from '../../../vakapay.services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Root implements OnInit {

  //input
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private passwordConfirm: string;

  //message error
  private messageError = '';
  private messageErrorFirstName = '';
  private messageErrorLastName = '';
  private messageErrorEmail = '';
  private messageErrorPassword = '';
  private messageErrorPasswordConfirm = '';

  //validate
  private isInvalid = true;

  constructor(
    toasterService: ToasterService,
    registerService: RegisterService
  ) {
    super(toasterService);
  }

  ngOnInit() {
  }

  validate() {
    try {
      UtilityValidate.require(this, ['firstName', 'lastName', 'email', 'password', 'passwordConfirm']);
      UtilityValidate.validateFirstName(this.firstName);
      this.isInvalid = false;
      this.messageError = '';
    } catch (error) {
      this.isInvalid = true;
      this.messageError = error.message;
    }
  }

  onFirstName(event: any) {
    try {
      //Get value
      this.firstName = Utility.getValueEventInput(event);

      //Validate first name
      UtilityValidate.require(this, ['firstName']);
      UtilityValidate.validateFirstName(this.firstName);

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorFirstName = error.message;
      this.isInvalid = true;
    }
  }

  onLastName(event: any) {
    try {
      //Get value
      this.lastName = Utility.getValueEventInput(event);

      //Validate lastName
      UtilityValidate.require(this, ['lastName']);
      UtilityValidate.validateLastName(this.lastName);

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorLastName = error.message;
      this.isInvalid = true;
    }
  }

  onEmail(event: any) {
    try {
      //Get value
      this.email = Utility.getValueEventInput(event);

      //Validate lastName
      UtilityValidate.require(this, ['email']);
      UtilityValidate.validateEmail(this.email);

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorEmail = error.message;
      this.isInvalid = true;
    }
  }

  onPassword(event: any) {
    try {
      //Get value
      this.password = Utility.getValueEventInput(event);

      //Validate password
      UtilityValidate.require(this, ['password']);
      UtilityValidate.validatePassword(this.password);

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorPassword = error.message;
      this.isInvalid = true;
    }
  }

  onPasswordConfirm(event: any) {
    try {
      //Get value
      this.passwordConfirm = Utility.getValueEventInput(event);

      //Validate password confirm
      UtilityValidate.require(this, ['passwordConfirm']);
      UtilityValidate.validatePassword(this.passwordConfirm);

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorPasswordConfirm = error.message;
      this.isInvalid = true;
    }
  }

  async register() {

    this.validate();

    if (this.isInvalid === true) {
      this.showToastError(this.messageError);
      return;
    }

    var mRegister = new Register();
    mRegister.firstName = this.firstName;
    mRegister.lastName = this.lastName;
    mRegister.email = this.email;
    mRegister.password = this.password;
    mRegister.passwordConfirm = this.passwordConfirm;

    //send ajax
    let result = await

      console.log(mRegister);
  }
}
