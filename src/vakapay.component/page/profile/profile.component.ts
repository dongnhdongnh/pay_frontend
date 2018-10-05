import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { Account } from 'model/account/Account';

import { Root } from 'component/root/root.component';
import { AccountService } from 'services/account/account.service';
import { ImageService } from 'services/image/image.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends Root implements OnInit {
  mAccount: Account;
  mAccountSerive: any;
  selectedFile: any;
  isImageLoading: boolean;
  isInvalidFile = false;
  imageReset: any;

  //message
  messageError = '';
  messageErrorFile = '';

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
    this.isImageLoading = false;
  }

  resetImage() {
    this.mAccount.avatar = this.imageReset;
    this.selectedFile = null;
  }

  ngOnInit() {
    this.mAccount = this.mAccountSerive.mAccount || {};
    this.imageReset = this.mAccount.avatar;
  }

  onStreetAddress1(event) {

  }

  onChangeImageProfile(event) {
    this.validateImageUpload();
    this.selectedFile = event.target.files[0];
    if (this.selectedFile == null) return;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.mAccount.avatar = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  validateImageUpload() {
    try {
      if (this.selectedFile == null) throw new Error('File is not choose.');

      const fileSize = this.selectedFile.size / 1024 / 1024; // in MB
      const MAX_FILE_SIZE = 2; //MB
      if (fileSize > MAX_FILE_SIZE) throw new Error(`File size exceeds ${MAX_FILE_SIZE} MB`);

      this.isInvalidFile = false;

    } catch (error) {
      this.messageErrorFile = error.message;
      this.isInvalidFile = true;
    }
  }

  async onUpload() {
    try {
      this.isImageLoading = true;
      await Utility.sleep(1000);
      this.validateImageUpload();

      if (this.isInvalidFile === true) {
        this.isImageLoading = false;
        return;
      }

      //send ajax
      let result = await this.mImageService.upload(this.selectedFile);

      //Show message success
      this.isImageLoading = false;

      if (Utility.isError(result)) {
        //Reset image if upload error
        this.resetImage();
        return;
      }

      //Change src of avatar with new link
      this.mAccount.avatar = result.data;

      return;
    } catch (error) {
      this.isImageLoading = false;
    }
  }

}
