import { TwofaEnableService } from 'services/twofa/twofa-enable.service';
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

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private twofaEnableService: TwofaEnableService) {
  }

  ngAfterViewInit(): void {
    this.form = {
      modal: this.ngxSmartModalService.getModal(this.modalName)
    }
  }

  openModal() {
    this.twofaEnableService.requireSendCodePhone();
    this.ngxSmartModalService.getModal(this.modalName).open();
    
  }

  closeModal() {
    this.ngxSmartModalService.getModal(this.modalName).close();
  }

}
