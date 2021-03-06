import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Root } from 'component/root/root.component';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Login } from 'model/authenticate/Login';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { LoginService } from 'services/login/login.service';
import { AlertService } from 'services/system/alert.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent extends Root implements OnInit {
  //element
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;

  //input
  private email: string;
  private password: string;

  //message error
  messageError = '';
  messageErrorEmail = '';
  messageErrorPassword = '';

  //validate
  isInvalid = true;

  //Loading
  isLoading = false;

  //Service
  private loginService: LoginService;
  private alertService: AlertService;

  constructor(
    toasterService: ToasterService,
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    loginService: LoginService,
    alertService: AlertService
  ) {
    super(titleService, route, router);
    this.loginService = loginService;
    this.alertService = alertService;
  }

  ngOnInit() {
  }

  async login() {
    try {
      this.isLoading = true;
      this.validate();

      if (this.isInvalid === true) {
        this.isLoading = false;
        this.alertService.showToastError(this.messageError);
        return;
      }

      // tslint:disable-next-line:prefer-const
      let mLogin = new Login(this.email, this.password, '');

      //send ajax
      let result = await this.loginService.login(mLogin);

      //Check result
      if (Utility.isError(result))
        throw new Error(result.message);

      //Show message success
      this.alertService.showToastSuccess(result.message);
      this.isLoading = false;

      return;
    } catch (error) {
      this.isLoading = false;
      this.alertService.showToastError(error.message || error.statusText);
    }
  }

  validate() {
    try {
      UtilityValidate.require(this, ['email', 'password']);

      UtilityValidate.validateEmail(this.email);
      UtilityValidate.validatePassword(this.password);

      this.isInvalid = false;
      this.messageError = '';

      return true;
    } catch (error) {
      this.isInvalid = true;
      this.messageError = error.message;

      return false;
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

  onPassword(event: any) {
    try {
      if (Utility.isEnter(event)) {
        this.login();
        return;
      }

      //Get value
      this.password = Utility.getValueEventInput(event);

      //Validate password
      UtilityValidate.require(this, ['password']);
      UtilityValidate.validatePassword(this.password);

      this.messageErrorPassword = '';

      //Validate form
      this.validate();
    } catch (error) {
      this.messageErrorPassword = error.message;
      this.isInvalid = true;
    }
  }

}
