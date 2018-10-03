import { ConfigService } from 'network/config/config.service';
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
    private oauthService: OAuthService,
    private configService: ConfigService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('It is login...');
      this.oauthService.configure({
        issuer: this.configService.urlVakaid,
        redirectUri: window.location.origin + '/login',
        silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
        clientId: 'implicit',
        scope: 'openid profile api1',
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
      let isValidToken = this.oauthService.hasValidAccessToken();
      const token = this.oauthService.getAccessToken();
      if(isValidToken === false){
        this.oauthService.getIdToken();
        localStorage.clear();
        return;
      }
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);

    }
  }

  ngOnInit() {
  }

}
