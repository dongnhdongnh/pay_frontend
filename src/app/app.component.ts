import { ConfigService } from 'network/config/config.service';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { OAuthService, JwksValidationHandler, OAuthEvent } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'vakapay';
  oauthService: OAuthService;

  constructor(
    configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object,
    oauthService: OAuthService,
    private accountService: AccountService
  ) {
    //get info of user
    this.getInfo();

    if (!isPlatformBrowser(this.platformId)) { return; }
    this.oauthService = oauthService;
    const { issuer, redirectUri, silentRefreshRedirectUri, postLogoutRedirectUri, clientId } = configService;
    const config = {
      issuer, redirectUri, silentRefreshRedirectUri, postLogoutRedirectUri, clientId,
      scope: 'openid profile api1',
      silentRefreshTimeout: 5000, // For faster testing
      sessionChecksEnabled: true,
      requireHttps: true,
    };
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  async getInfo() {
    await this.accountService.getInfo();

    

  }
}
