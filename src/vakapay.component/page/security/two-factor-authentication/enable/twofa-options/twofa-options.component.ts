import { Component, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'twofa-options',
  templateUrl: './twofa-options.component.html',
})
export class TwofaOptionsComponent implements AfterViewInit {
  option: number;

  form = {
    modal: {},
    reset: {},
    option: 0,
    isValid: false,
    isChange: false,
  };

  modalName = 'modalTwofaOptions';

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  validate() {
    try {
      //get value input
      if ([1, 2, 3].includes(this.option) === false) {
        throw new Error(`Option is invalid.`);
      }

      this.form.isValid = true;
    } catch (error) {
      this.form.isValid = false;
    }
  }

  change(value) {
    this.form.isChange = true;
    this.option = value;
    this.form.option = this.option;
    this.validate();
  }

  reset() {
    this.form.isChange = false;
    this.form.isValid = false;
  }

  ngAfterViewInit(): void {
    this.form.modal = this.ngxSmartModalService.getModal(this.modalName);
  }

  openModal() {
    this.ngxSmartModalService.getModal(this.modalName).open();
  }

  closeModal() {
    this.ngxSmartModalService.getModal(this.modalName).close();
  }

}
