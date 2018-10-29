import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resend-sms',
  templateUrl: './resend-sms.component.html',
  styleUrls: ['./resend-sms.component.css']
})
export class ResendSmsComponent {
  @Input() isLoading: boolean = false;
  constructor() { }
}
