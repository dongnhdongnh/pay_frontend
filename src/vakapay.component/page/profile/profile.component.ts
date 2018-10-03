import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { Account } from 'model/account/Account';

import { Root } from 'component/root/root.component';
import { AccountService } from 'services/account/account.service';
import { ImageService } from 'services/image/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends Root implements OnInit {
  mAccount: Account;
  mAccountSerive: any;
  selectedFile: any;
  isLoading = false;
  isInvalid = false;
  messageError = '';

  //Service
  mImageService: ImageService;

  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
    mAccountSerive: AccountService,
    mImageService: ImageService,
  ) {
    super(titleService, route, router);
    this.mAccountSerive = mAccountSerive;
    this.mImageService = mImageService;
  }

  ngOnInit() {
    this.mAccount = this.mAccountSerive.mAccount || {};
  }

  onChangeImageProfile(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile == null) return;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.mAccount.avatar = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  validate() { }

  async onUpload() {
    try {
      debugger;
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
    }
  }

}
