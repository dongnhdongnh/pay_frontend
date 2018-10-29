import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'model/account/Account';
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
  isLoading: boolean;
  isInvalid = true;
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
    this.isLoading = false;
    this.urlApi = configService.urlApi;
  }

  onReset() {
    this.mAccount.avatar = this.imageReset;
    this.selectedFile = null;
    this.isInvalid = true;
    this.isLoading = false;
  }


  ngOnInit() {
    this.imageReset = this.mAccount.avatar;
  }

  validateImage(file) {
    try {
      UtilityValidate.validateImage(file);

      this.isInvalid = false;
      this.messageErrorFile = '';
      return true;
    } catch (error) {
      this.messageErrorFile = error.message;
      this.isInvalid = true;
      this.onReset();
      return false;
    }
  }

  onChangeImage(event) {
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
      this.isLoading = true;
      UtilityValidate.validateImage(this.selectedFile);

      if (this.isInvalid === true) {
        this.isLoading = false;
        return;
      }

      debugger;

      //send ajax
      let result = await this.mImageService.uploadImgur(this.selectedFile);

      debugger;

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) {
        //Reset image if upload error
        this.onReset();
        return;
      }

      //Change src of avatar with new link
      let urlImage = new URL(result.data, this.urlApi);
      this.mAccount.avatar = urlImage.href;
      this.imageReset = this.mAccount.avatar;

      this.onReset();

      return;
    } catch (error) {
      this.onReset();
    }
  }
}
