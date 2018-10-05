import { ConfigService } from 'network/config/config.service';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  oauthService: OAuthService;
  link: string;
  configService: ConfigService;

  constructor(oauthService: OAuthService, configService: ConfigService) {
    this.oauthService = oauthService;
    this.configService = configService;

    let vakaidUrl = this.configService.issuer;
    var id = this.oauthService.getIdToken();

    this.link =
      `${vakaidUrl}/connect/endsession?post_logout_redirect_uri=` +
      encodeURIComponent(this.configService.returnUrl) + '&id_token_hint='
      + encodeURIComponent(id);
  }

  ngOnInit() {
    this.oauthService.logOut();
    localStorage.clear();
    console.log("aaa", this.oauthService.getIdToken());

  }
}
