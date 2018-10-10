import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'close-account-verify-password',
  templateUrl: './close-account-verify-password.component.html',
})
export class CloseAccountVerifyPasswordComponent implements OnInit {
  @Input() form;
  constructor() { }

  ngOnInit() {
  }

}
