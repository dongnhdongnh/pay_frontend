import { ConfigService } from './../../../vakapay.core/vakapay.network/config/config.service';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private oauthService: OAuthService;
  link: string;

  constructor(oauthService: OAuthService, private configService: ConfigService) {
    this.oauthService = oauthService;

    let vakaidUrl = this.configService.urlVakaid;
    var id = this.oauthService.getIdToken();

    this.link =
      `${vakaidUrl}/connect/endsession?post_logout_redirect_uri=` +
      encodeURIComponent(this.configService.returnUrl) + '&id_token_hint='
      + encodeURIComponent(id);
  }

  ngOnInit() {
    localStorage.clear();
    this.oauthService.logOut();
  }

}
