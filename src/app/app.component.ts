import { ConfigService } from 'network/config/config.service';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { OAuthService, JwksValidationHandler, OAuthEvent } from "angular-oauth2-oidc";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vakapay';
  oauthService: OAuthService;
  configService: ConfigService;

  constructor(
    configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object,
    oauthService: OAuthService,
  ) {
    this.configService = configService;
    if (!isPlatformBrowser(this.platformId)) return;
    this.oauthService = oauthService;
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
    console.log(`My link is ${window.location.origin}`);
  }
}
