import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

  //#region init variable
  @ViewChild('password') passwordElement: ElementRef;
  @ViewChild('passwordNew') passwordNewElement: ElementRef;
  @ViewChild('passwordConfirm') passwordConfirmElement: ElementRef;
  @ViewChild('phone') phoneElement: ElementRef;

  //input
  password: string;
  passwordNew: string;
  passwordConfirm: string;
  phone: string;

  //status
  isLoading = false;
  isValid = false;
  isChange = false;

  //message error
  messageErrorPassword = '';
  messageErrorPasswordNew = '';
  messageErrorPasswordConfirm = '';
  messageErrorPhone = '';

  //service
  accountService: AccountService;
  //#endregion init variable

  constructor(public ngxSmartModalService: NgxSmartModalService, accountService: AccountService) {
    this.accountService = accountService;

  }

  ngOnInit() {
  }

  showModalChangePassword() {
    this.ngxSmartModalService.getModal('changePasswordModal').open();
  }

  onPassword(event) { }
  onPasswordNew(event) { }
  onPasswordConfirm(event) { }
  onPhone(event) { }
  onUpdate() { }

}
