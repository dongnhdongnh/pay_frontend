import { Component, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
})

export class TwoFactorAuthenticationComponent implements AfterViewInit {

  form = {
    modal: {}
  };

  modalName = 'modalTwoFA';

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit(): void {
    this.form = {
      modal: this.ngxSmartModalService.getModal(this.modalName)
    }
  }

  openModal() {
    this.ngxSmartModalService.getModal(this.modalName).open();
  }

  closeModal() {
    this.ngxSmartModalService.getModal(this.modalName).close();
  }

}
