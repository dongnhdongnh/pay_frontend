import { Component, OnInit } from '@angular/core';
import { Root } from '../../root/root.component';
import { ToasterService } from 'angular2-toaster';

import { Register } from '../../../vakapay.model/authenticate/Register';
import { Utility } from '../../../vakapay.core/vakapay.utility/Utility';
import { UtilityValidate } from '../../../vakapay.core/vakapay.utility/UtilityValidate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit extends Root {

  //input
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private passwordConfirm: string;

  //message error
  private messageErrorFirstName = '';
  private messageErrorLastName = '';
  private messageErrorEmail = '';
  private messageErrorPassword = '';
  private messageErrorPasswordConfirm = '';

  //validate
  private isInvalid = true;

  constructor(toasterService: ToasterService) {
    super(toasterService);
  }

  ngOnInit() {
  }

  validate() {
    try {
      UtilityValidate.validateFirstName(this.firstName);
    } catch (error) {
      this.isInvalid = true;
      this.showToastError(error.message);
      throw error;
    }
  }

  onFirstName(event: any) {
    try {
      this.firstName = Utility.getValueEventInput(event);
      UtilityValidate.validateFirstName(this.firstName);
    } catch (error) {
      this.messageErrorFirstName = error.message;
      this.isInvalid = true;
    }
  }

  onLastName(event: any) {
    try {
      this.lastName = Utility.getValueEventInput(event);
      UtilityValidate.validateLastName(this.lastName);
    } catch (error) {
      this.show
    }
  }

  onEmail(event: any) { this.email = Utility.getValueEventInput(event); }

  onPassword(event: any) { this.password = Utility.getValueEventInput(event); }

  onPasswordConfirm(event: any) { this.passwordConfirm = Utility.getValueEventInput(event); }

  register() {
    var mRegister = new Register();
    mRegister.firstName = this.firstName;
    mRegister.lastName = this.lastName;
    mRegister.email = this.email;
    mRegister.password = this.password;
    mRegister.passwordConfirm = this.passwordConfirm;

    console.log(mRegister);
  }
}
