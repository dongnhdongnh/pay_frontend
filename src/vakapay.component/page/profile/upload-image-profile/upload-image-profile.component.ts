import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'model/account/Account';
import { AccountService } from 'services/account/account.service';
import { ImageService } from 'services/image/image.service';
import { Utility } from 'utility/Utility';
import { UtilityValidate } from 'utility/UtilityValidate';
import { ConfigService } from 'network/config/config.service';

@Component({
  selector: 'upload-image-profile',
  templateUrl: './upload-image-profile.component.html',
  styleUrls: ['./upload-image-profile.component.css']
})
export class UploadImageProfileComponent implements OnInit {
  @Input() mAccount: Account; 

  urlApi: string;
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
    mImageService: ImageService,
    configService: ConfigService
  ) {
    this.mImageService = mImageService;
    this.isImageLoading = false;
    this.urlApi = configService.urlApi;
  }

  resetFormUploadImage() {
    this.mAccount.avatar = this.imageReset;
    this.selectedFile = null;
    this.isInvalidFile = true;
    this.isImageLoading = false;
  }


  ngOnInit() {
    this.imageReset = this.mAccount.avatar;
  }

  validateImage(file) {
    try {
      UtilityValidate.validateImage(file);

      this.isInvalidFile = false;
      this.messageErrorFile = '';
      return true;
    } catch (error) {
      this.messageErrorFile = error.message;
      this.isInvalidFile = true;
      this.resetFormUploadImage();
      return false;
    }
  }

  onChangeImageProfile(event) {
    const file = event.target.files[0];

    if (file == null) return;

    if (!this.validateImage(file)) return;

    this.selectedFile = file;

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.mAccount.avatar = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  async onUpload() {
    try {
      this.isImageLoading = true;
      await Utility.sleep(1000);
      UtilityValidate.validateImage(this.selectedFile);

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
        this.resetFormUploadImage();
        return;
      }

      //Change src of avatar with new link
      let urlImage = new URL(result.data, this.urlApi);
      this.mAccount.avatar = urlImage.href;
      this.imageReset = this.mAccount.avatar;

      this.resetFormUploadImage();

      return;
    } catch (error) {
      this.resetFormUploadImage();
    }
  }
}
