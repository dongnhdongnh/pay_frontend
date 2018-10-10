import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
})
export class CloseAccountComponent {

  form = {
    modal: {}
  };

  modalName = 'modalCloseAccount';

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