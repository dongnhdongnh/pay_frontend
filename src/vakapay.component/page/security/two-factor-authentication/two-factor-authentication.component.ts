import { TwofaService } from 'services/twofa/twofa.service';
import { Component, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SecurityService } from 'services/security/security.service';

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
    private twofaEnableService: TwofaService,
    public securityService: SecurityService) {
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
