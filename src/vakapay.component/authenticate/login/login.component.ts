import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { OAuthService, OAuthEvent } from "angular-oauth2-oidc";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import { ConfigService } from 'network/config/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  oauthService: OAuthService;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    oauthService: OAuthService,
    private configService: ConfigService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService = oauthService;
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
              if (isValidToken === false) {
                this.oauthService.getIdToken();
                localStorage.clear();
                return;
              }
              localStorage.setItem('token', accessToken);
              this.router.navigate(['/dashboard']);
              return;
            }
        }
      });
    }
  }

  ngOnInit() {
  }

}
