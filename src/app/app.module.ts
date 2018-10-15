import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

//Add libriary
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatTableModule, MatTabsModule, MatSidenavModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//ng-select
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';

//modal in angular
import { NgxSmartModalModule } from 'ngx-smart-modal';

// RECOMMENDED (doesn't work with system.js)
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//Add libriary font
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Add routing
import { AppRoutingModule } from './app-routing.module';

//Component parent
import { AppComponent } from './app.component';

//Component children
//Authentication
import { RegisterComponent } from 'component/authenticate/register/register.component';
import { LoginComponent } from 'component/authenticate/login/login.component';
import { HeaderAuthenticateComponent } from 'component/authenticate/header-authenticate/header-authenticate.component';
import { LoadingComponent } from 'component/loading/loading.component';
import { VerifyComponent } from 'component/authenticate/verify/verify.component';
import { FormLoginComponent } from 'component/authenticate/form/form-login/form-login.component';
import { FormRegisterComponent } from 'component/authenticate/form/form-register/form-register.component';
import { DashboardComponent } from 'component/dashboard/dashboard.component';
import { IndexComponent } from 'component/page/index/index.component';
import { HeaderComponent } from 'component/page/header/header.component';
import { LeftPanelComponent } from 'component/page/left-panel/left-panel.component';
import { FooterComponent } from 'component/page/footer/footer.component';
import { PortfolioComponent } from 'component/page/portfolio/portfolio.component';

//VakaId Login
import { OAuthModule } from 'angular-oauth2-oidc';

//Component page
import { LandingComponent } from 'component/landing/landing.component';
import { LogoutComponent } from 'component/authenticate/logout/logout.component';
import { PagenotfoundComponent } from 'component/page/pagenotfound/pagenotfound.component';
import { MessageErrorInputComponent } from 'component/system/message-error-input/message-error-input.component';
import { UploadImageProfileComponent } from 'component/page/profile/upload-image-profile/upload-image-profile.component';
import { UpdateProfileComponent } from 'component/page/profile/update-profile/update-profile.component';
import { ProfileComponent } from 'component/page/profile/profile.component';
import { PreferencesComponent } from 'component/page/preferences/preferences.component';
import { NotificationComponent } from 'component/page/preferences/notification/notification.component';
import { PreferenceComponent } from 'component/page/preferences/preference/preference.component';
import { SecurityComponent } from 'component/page/security/security.component';
import { ChangePasswordComponent } from 'component/page/security/change-password/change-password.component';
import { TwoFactorAuthenticationComponent } from 'component/page/security/two-factor-authentication/two-factor-authentication.component';
import { TwofaOptionsComponent } from 'component/page/security/two-factor-authentication/enable/twofa-options/twofa-options.component';
import { SessionActiveComponent } from 'component/page/activity/session-active/session-active.component';
import { AccountActivityComponent } from 'component/page/activity/account-activity/account-activity.component';
import { CloseAccountComponent } from 'component/page/security/close-account/close-account.component';

//TwofaVerify
import { TwofaVerifyCodeComponentWithPhoneComponent }
  from 'component/page/security/two-factor-authentication/enable/enable-twofa-verify-phone/twofa-verify-code-with-phone.component';
import { TwofaOptionsVerifyWithPhoneComponent }
  from 'component/page/security/two-factor-authentication/enable/twofa-options/twofa-options-verify-with-phone/twofa-options-verify-with-phone.component';

import { CloseAccountVerifyPasswordComponent }
  from 'component/page/security/close-account/close-account-verify-password/close-account-verify-password.component';
import { CloseAccountVerifyPhoneComponent }
  from 'component/page/security/close-account/close-account-verify-phone/close-account-verify-phone.component';
import { LoadingButtonComponent } from 'component/loading-button/loading-button.component';
import { ActivityComponent } from 'component/page/activity/activity.component';
import { ConfirmedDevicesComponent } from 'component/page/activity/confirmed-devices/confirmed-devices.component';
import { ThirdPartyAppComponent } from 'component/page/activity/third-party-app/third-party-app.component';
import { RefreshComponent } from 'component/refresh/refresh.component';
import { ButtonDeleteComponent } from 'component/button-delete/button-delete.component';
import { WaitingLoadPageComponent } from 'component/waiting-load-page/waiting-load-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderAuthenticateComponent,
    LoadingComponent,
    VerifyComponent,
    FormLoginComponent,
    FormRegisterComponent,
    DashboardComponent,
    IndexComponent,
    HeaderComponent,
    LeftPanelComponent,
    FooterComponent,
    PortfolioComponent,
    LandingComponent,
    LogoutComponent,
    ProfileComponent,
    PagenotfoundComponent,
    MessageErrorInputComponent,
    UploadImageProfileComponent,
    UpdateProfileComponent,
    PreferencesComponent,
    NotificationComponent,
    PreferenceComponent,
    SecurityComponent,
    ChangePasswordComponent,
    TwoFactorAuthenticationComponent,
    TwofaOptionsComponent,
    SessionActiveComponent,
    AccountActivityComponent,
    CloseAccountComponent,
    TwofaVerifyCodeComponentWithPhoneComponent,
    CloseAccountVerifyPasswordComponent,
    CloseAccountVerifyPhoneComponent,
    LoadingButtonComponent,
    TwofaOptionsVerifyWithPhoneComponent,
    ActivityComponent,
    ConfirmedDevicesComponent,
    ThirdPartyAppComponent,
    RefreshComponent,
    ButtonDeleteComponent,
    WaitingLoadPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MatTableModule, MatSidenavModule,
    MatButtonModule, MatTabsModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule,

    //Font
    AngularFontAwesomeModule,

    //Redirect VakaId
    OAuthModule.forRoot(),

    //Bootstrap dropdow module
    BsDropdownModule.forRoot(),

    //modal
    NgxSmartModalModule.forRoot(),

    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
  ],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Custom not found'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
