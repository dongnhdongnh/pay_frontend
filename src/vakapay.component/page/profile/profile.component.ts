import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { Account } from 'model/account/Account';

import { Root } from 'component/root/root.component';
import { AccountService } from 'services/account/account.service';
import { ImageService } from 'services/image/image.service';
import { Utility } from 'utility/Utility';
import { AlertService } from 'services/system/alert.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends Root implements OnInit {
  mAccount: Account;
  mAccountSerive: any;
  selectedFile: any;
  mImageService: ImageService;
  isLoading = false;
  isInvalid = false;
  messageError = '';

  //Service
  alertService: AlertService;

  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    mAccountSerive: AccountService,
    mImageService: ImageService,
    alertService: AlertService
  ) {
    super(titleService, route, router);
    this.mAccountSerive = mAccountSerive;
    this.mImageService = mImageService;
    this.alertService = alertService;
  }

  ngOnInit() {
    this.mAccount = this.mAccountSerive.mAccount || {};
  }

  onChangeImageProfile(event) {
    debugger;
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.mAccount.avatar = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  validate() { }

  async onUpload() {
    try {
      this.isLoading = true;
      this.validate();

      if (this.isInvalid === true) {
        this.isLoading = false;
        return;
      }

      //send ajax
      let result = await this.mImageService.upload(this.selectedFile);

      //Show message success
      this.isLoading = false;

      return;
    } catch (error) {
      this.isLoading = false;
      this.alertService.showToastError(error.message || error.statusText);
    }
  }

}
