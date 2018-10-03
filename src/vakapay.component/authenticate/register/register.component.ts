const returnUrl = 'http://192.168.1.80:4200';
const vakaidUrl = 'http://192.168.1.185:5000';

import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
    window.location.href = `${vakaidUrl}/account/register?returlUrl=${returnUrl}`;
  }

  ngOnInit() {
  }
}
