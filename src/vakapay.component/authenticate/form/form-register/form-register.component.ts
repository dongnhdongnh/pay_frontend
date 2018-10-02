import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Root } from 'component/root/root.component';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Register } from 'model/authenticate/Register';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { RegisterService } from 'services/register/register.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent extends Root implements OnInit {
  //element
  @ViewChild('firstName') firstNameElement: ElementRef;
  @ViewChild('lastName') lastNameElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;
  @ViewChild('passwordConfirm') passwordConfirmElement: ElementRef;

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
  private messageErrorPasswordMatch = '';

  //validate
  private isInvalid = true;

  //Loading
  private isLoading = false;

  //Service
  private registerService: RegisterService;

  constructor(
    toasterService: ToasterService,
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    registerService: RegisterService
  ) {
    super(toasterService, titleService, route, router);
    this.registerService = registerService;
  }

  ngOnInit() {
  }

  async register() {
    try {
      this.isLoading = true;
      this.validate();

      if (this.isInvalid === true) {
        this.isLoading = false;
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
      let result = await this.registerService.register(mRegister);

      //Check result
      if (Utility.isError(result))
        throw new Error(result.message);

      //Show message success
      this.showToastSuccess(result.message);
      this.isLoading = false;

      return;
    } catch (error) {
      this.isLoading = false;
      this.showToastError(error.message || error.statusText);
    }
  }

  validate() {
    try {
      UtilityValidate.require(this, ['firstName', 'lastName', 'email', 'password', 'passwordConfirm']);

      UtilityValidate.validateFirstName(this.firstName);
      UtilityValidate.validateLastName(this.lastName);
      UtilityValidate.validateEmail(this.email);
      UtilityValidate.validatePassword(this.password);
      UtilityValidate.validatePassword(this.passwordConfirm);
      UtilityValidate.comparePassword(this.password, this.passwordConfirm);

      this.isInvalid = false;
      this.messageError = '';

      return true;
    } catch (error) {
      this.isInvalid = true;
      this.messageError = error.message;

      return false;
    }
  }

  onFirstName(event: any) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.lastNameElement);
        this.redirect('/login');
        return;
      }
      //Get value
      this.firstName = Utility.getValueEventInput(event);

      //Validate first name
      UtilityValidate.require(this, ['firstName']);
      UtilityValidate.validateFirstName(this.firstName);

      this.messageErrorFirstName = '';
      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorFirstName = error.message;
      this.isInvalid = true;
    }
  }

  onLastName(event: any) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.emailElement);
        return;
      }

      //Get value
      this.lastName = Utility.getValueEventInput(event);

      //Validate lastName
      UtilityValidate.require(this, ['lastName']);
      UtilityValidate.validateLastName(this.lastName);

      this.messageErrorLastName = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorLastName = error.message;
      this.isInvalid = true;
    }
  }

  onEmail(event: any) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.passwordElement);
        return;
      }

      //Get value
      this.email = Utility.getValueEventInput(event);

      //Validate lastName
      UtilityValidate.require(this, ['email']);
      UtilityValidate.validateEmail(this.email);

      this.messageErrorEmail = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorEmail = error.message;
      this.isInvalid = true;
    }
  }

  comparePassword() {
    try {
      UtilityValidate.comparePassword(this.password, this.passwordConfirm);
      this.messageErrorPasswordConfirm = '';
    } catch (error) {
      this.messageErrorPasswordConfirm = error.message;
    }
  }

  onPassword(event: any) {
    try {
      if (Utility.isEnter(event)) {
        Utility.focus(this.passwordConfirmElement);
        return;
      }

      //Get value
      this.password = Utility.getValueEventInput(event);

      //Validate password
      UtilityValidate.require(this, ['password']);
      UtilityValidate.validatePassword(this.password);
      this.comparePassword();

      this.messageErrorPassword = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorPassword = error.message;
      this.isInvalid = true;
    }
  }

  onPasswordConfirm(event: any) {
    try {
      if (Utility.isEnter(event)) {
        this.register();
        return;
      }

      //Get value
      this.passwordConfirm = Utility.getValueEventInput(event);

      //Validate password confirm
      this.comparePassword();

      //Validate form
      this.validate();
    } catch (error) {
      this.isInvalid = true;
    }
  }

}
