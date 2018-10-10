import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'close-account-verify-phone',
  templateUrl: './close-account-verify-phone.component.html',
})
export class CloseAccountVerifyPhoneComponent implements OnInit {
  @Input() form;
  constructor() { }

  ngOnInit() {
  }

}
