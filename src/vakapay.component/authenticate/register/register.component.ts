import { ConfigService } from 'network/config/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private configService: ConfigService
  ) {
    let urlVakaid = this.configService.urlVakaid;
    let returnUrl = this.configService.returnUrl;
    window.location.href = `${urlVakaid}/account/register?returlUrl=${returnUrl}`;
  }

  ngOnInit() {
  }
}
