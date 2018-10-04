import { ConfigService } from 'network/config/config.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { OAuthService, JwksValidationHandler, OAuthEvent } from "angular-oauth2-oidc";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

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

      const config = {
        issuer: this.configService.urlVakaid,
        redirectUri: window.location.origin + '/login',
        silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
        postLogoutRedirectUri: window.location.origin + '/',
        clientId: configService.development === 'localhost' ? 'implicittest' : 'implicit',
        scope: 'openid profile api1',
        silentRefreshTimeout: 5000, // For faster testing
        sessionChecksEnabled: true,
        requireHttps: configService.development !== 'localhost',
      }

      this.oauthService.configure(config);
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

              let isValidToken = this.oauthService.hasValidAccessToken();
              const token = this.oauthService.getAccessToken();
              if (isValidToken === false) {
                this.oauthService.getIdToken();
                localStorage.clear();
                return;
              }
              localStorage.setItem('token', token);
              this.router.navigate(['/dashboard']);
              return;
            }
        }
      });
      let isValidToken = this.oauthService.hasValidAccessToken();
      const token = this.oauthService.getAccessToken();
      if (isValidToken === false) {
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
