import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

const vakaidUrl = 'http://192.168.1.185:5000';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private oauthService: OAuthService;

  constructor(oauthService: OAuthService) {
    this.oauthService = oauthService;
  }

  ngOnInit() {
    var id = this.oauthService.getIdToken();
    localStorage.clear();

    window.location.href =
      `${vakaidUrl}/connect/endsession?post_logout_redirect_uri=` +
      encodeURIComponent('http://vakapay/register') + '&id_token_hint='
      + encodeURIComponent(id);
  }

}
