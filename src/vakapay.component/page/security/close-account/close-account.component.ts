import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
})
export class CloseAccountComponent {

  form = {
    step: 1,
    modal: {},
    password: ''
  };

  modal: any;
  modalName = 'modalCloseAccount';

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngAfterViewInit(): void {
    this.modal = this.ngxSmartModalService.getModal(this.modalName);
    this.form.modal = this.modal;
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

}