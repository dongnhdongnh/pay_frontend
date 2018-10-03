import { Component, OnInit } from '@angular/core';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  mAccount: any;
  mAccountSerive: any;
  urlImageProfile = 'assets/images/profile/img1.jpg';
  constructor(mAccountSerive: AccountService) {
    this.mAccountSerive = mAccountSerive;
  }

  ngOnInit() {
    this.mAccount = this.mAccountSerive.mAccount || {};
  }

  onChangeImageProfile(event) {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.urlImageProfile = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    // this.http.post('my-backend.com/file-upload', uploadData)
    //   .subscribe(...);
  }

}
