import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { OAuthService, JwksValidationHandler, OAuthEvent } from "angular-oauth2-oidc";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private oauthService: OAuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.configure({
        issuer: 'http://192.168.1.185:5000', 
        redirectUri: window.location.origin + '/',
        silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
        clientId: 'implicit',
        scope: 'openid profile',
        silentRefreshTimeout: 5000, // For faster testing
        sessionChecksEnabled: true,
        requireHttps: false,
      });
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndLogin();

      this.oauthService.events.subscribe(({ type }: OAuthEvent) => {
        switch (type) {
          case 'token_received':
            const idToken = this.oauthService.getIdToken();
            const accessToken = this.oauthService.getAccessToken();
            if (accessToken && idToken) {
              console.log("AccessToken : " + accessToken);
              console.log("IdToken : " + idToken);
            }
        }
      });
      console.log(this.oauthService.hasValidAccessToken());
      console.log(this.oauthService.getAccessToken());
    }
  }

  ngOnInit() {
  }

}
