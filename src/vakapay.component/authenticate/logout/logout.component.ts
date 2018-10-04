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

  constructor(oauthService: OAuthService, private configService: ConfigService) {
    this.oauthService = oauthService;
  }

  ngOnInit() {
    let vakaidUrl = this.configService.urlVakaid;
    var id = this.oauthService.getIdToken();
    this.oauthService.logOut();
    localStorage.clear();

    window.location.href =
      `${vakaidUrl}/connect/endsession?post_logout_redirect_uri=` +
      encodeURIComponent('http://vakapay.com/') + '&id_token_hint='
      + encodeURIComponent(id);
  }

}
