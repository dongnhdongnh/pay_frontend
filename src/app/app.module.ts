import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Import ReactiveFormsModule
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// Add libriary
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ng-select
// Add libriary
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatTabsModule,
  MatSidenavModule,
  MatExpansionModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from 'ngx-clipboard';
// ng-select
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';

// modal in angular
import { NgxSmartModalModule } from 'ngx-smart-modal';

// RECOMMENDED (doesn't work with system.js)
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Add libriary font
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Add routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Component parent
import { AppComponent } from './app.component';

// import pagination component
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
// Component children
// Authentication
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
import { PriceComponent } from 'component/page/price/price.component';
import { PortfolioValueComponent } from 'component/page/portfolio-value/portfolio-value.component';
import { RecentActivityComponent } from 'component/page/recent-activity/recent-activity.component';
import { ActivityDetail } from 'component/page/recent-activity/activity-detail/activity-detail.component';

// Chartjs
import { ChartsModule } from 'ng2-charts';

// VakaId Login
import { OAuthModule } from 'angular-oauth2-oidc';

// Component page
import { LandingComponent } from 'component/landing/landing.component';
import { LogoutComponent } from 'component/authenticate/logout/logout.component';
import { PagenotfoundComponent } from 'component/page/pagenotfound/pagenotfound.component';
import { MessageErrorInputComponent } from 'component/system/message-error-input/message-error-input.component';
import { UploadImageProfileComponent } from 'component/page/profile/upload-image-profile/upload-image-profile.component';
import { UpdateProfileComponent } from 'component/page/profile/update-profile/update-profile.component';
import { ProfileComponent } from 'component/page/profile/profile.component';
import { PreferencesComponent } from 'component/page/preferences/preferences.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { AddressesComponent } from 'component/addresses/addresses.component';
import { ReportsComponent } from 'component/reports/reports.component';
import { ReportFormComponent } from 'component/report-form/report-form.component';
import { NotificationComponent } from 'component/page/preferences/notification/notification.component';
import { PreferenceComponent } from 'component/page/preferences/preference/preference.component';
import { SecurityComponent } from 'component/page/security/security.component';
import { ChangePasswordComponent } from 'component/page/security/change-password/change-password.component';
import { TwoFactorAuthenticationComponent } from 'component/page/security/two-factor-authentication/two-factor-authentication.component';
import { TwofaOptionsComponent } from 'component/page/security/two-factor-authentication/twofa-options/twofa-options.component';
import { SessionActiveComponent } from 'component/page/activity/session-active/session-active.component';
import { AccountActivityComponent } from 'component/page/activity/account-activity/account-activity.component';
import { CloseAccountComponent } from 'component/page/security/close-account/close-account.component';
import { ApiAccessComponent } from 'component/page/api-access/api-access.component';

import { AccountsComponent } from 'component/page/accounts/accounts.component';
// TwofaVerify
// tslint:disable-next-line:max-line-length
import { TwofaVerifyCodeComponentWithPhoneComponent } from 'component/page/security/two-factor-authentication/enable/enable-twofa/twofa-verify-code-with-phone.component';
import { TwofaOptionsVerifyWithPhoneComponent } from 'component/page/security/two-factor-authentication/twofa-options/twofa-options-verify-with-phone/twofa-options-verify-with-phone.component';
import { DisableTwofaComponent } from 'component/page/security/two-factor-authentication/disable-twofa/disable-twofa.component';
import { CloseAccountVerifyPasswordComponent } from 'component/page/security/close-account/close-account-verify-password/close-account-verify-password.component';
import { CloseAccountVerifyPhoneComponent } from 'component/page/security/close-account/close-account-verify-phone/close-account-verify-phone.component';
import { LoadingButtonComponent } from 'component/loading-button/loading-button.component';
import { ActivityComponent } from 'component/page/activity/activity.component';
import { ConfirmedDevicesComponent } from 'component/page/activity/confirmed-devices/confirmed-devices.component';
import { ThirdPartyAppComponent } from 'component/page/activity/third-party-app/third-party-app.component';
import { RefreshComponent } from 'component/refresh/refresh.component';
import { ButtonDeleteComponent } from 'component/button-delete/button-delete.component';
import { WaitingLoadPageComponent } from 'component/waiting-load-page/waiting-load-page.component';
import { ResendSmsComponent } from 'component/resend-sms/resend-sms.component';
import { BuyWidgetsComponent } from 'component/page/api-access/buy-widgets/buy-widgets.component';
import { ApiKeysComponent } from 'component/page/api-access/api-keys/api-keys.component';
import { Oauth2AppComponent } from 'component/page/api-access/oauth2-app/oauth2-app.component';
import { ApiAccessNotificationComponent } from 'component/page/api-access/api-access-notification/api-access-notification.component';
import { ListApiKeysComponent } from 'component/page/api-access/api-keys/list-api-keys/list-api-keys.component';

import { ShowApiKeyComponent } from 'component/page/api-access/api-keys/show-api-key/show-api-key.component';
import { ShowApiKeyWithTwofaComponent }
  from 'component/page/api-access/api-keys/show-api-key/show-api-key-with-twofa/show-api-key-with-twofa.component';
import { ShowApiKeyWithoutTwofaComponent }
  from 'component/page/api-access/api-keys/show-api-key/show-api-key-without-twofa/show-api-key-without-twofa.component';

import { QRCodeModule } from 'angularx-qrcode';

import { EditApiKeyComponent } from 'component/page/api-access/api-keys/edit-api-key/edit-api-key.component';
import { EditApiKeyWithTwofaComponent }
  from 'component/page/api-access/api-keys/edit-api-key/edit-api-key-with-twofa/edit-api-key-with-twofa.component';
import { EditApiKeyWithoutTwofaComponent }
  from 'component/page/api-access/api-keys/edit-api-key/edit-api-key-without-twofa/edit-api-key-without-twofa.component';

import { PaginationComponent } from 'component/pagination/pagination.component';

import { NewApiKeyComponent } from 'component/page/api-access/api-keys/new-api-key/new-api-key.component';
import { NewApiKeyWithTwofaComponent }
  from 'component/page/api-access/api-keys/new-api-key/new-api-key-with-twofa/new-api-key-with-twofa.component';
import { NewApiKeyWithoutTwofaComponent }
  from 'component/page/api-access/api-keys/new-api-key/new-api-key-without-twofa/new-api-key-without-twofa.component';

import { DisableApiKeyComponent } from 'component/page/api-access/api-keys/disable-api-key/disable-api-key.component';
import { DisableApiKeyWithTwofaComponent }
  from 'component/page/api-access/api-keys/disable-api-key/disable-api-key-with-twofa/disable-api-key-with-twofa.component';
import { DisableApiKeyWithoutTwofaComponent }
  from 'component/page/api-access/api-keys/disable-api-key/disable-api-key-without-twofa/disable-api-key-without-twofa.component';

import { EnableApiKeyComponent } from 'component/page/api-access/api-keys/enable-api-key/enable-api-key.component';
import { EnableApiKeyWithTwofaComponent }
  from 'component/page/api-access/api-keys/enable-api-key/enable-api-key-with-twofa/enable-api-key-with-twofa.component';
import { EnableApiKeyWithoutTwofaComponent }
  from 'component/page/api-access/api-keys/enable-api-key/enable-api-key-without-twofa/enable-api-key-without-twofa.component';

import { DeleteApiKeyComponent } from 'component/page/api-access/api-keys/delete-api-key/delete-api-key.component';
import { DeleteApiKeyWithTwofaComponent }
  from 'component/page/api-access/api-keys/delete-api-key/delete-api-key-with-twofa/delete-api-key-with-twofa.component';
import { DeleteApiKeyWithoutTwofaComponent }
  from 'component/page/api-access/api-keys/delete-api-key/delete-api-key-without-twofa/delete-api-key-without-twofa.component';

import { LockScreenComponent } from 'component/lock-screen/lock-screen.component';

import { LockScreenConfigComponent }
  from 'component/page/security/lock-screen/lock-screen.component';
import { LockScreenWithTwofaComponent }
  from 'component/page/security/lock-screen/lock-screen-with-twofa/lock-screen-with-twofa.component';
import { LockScreenWithoutTwofaComponent }
  from 'component/page/security/lock-screen/lock-screen-without-twofa/lock-screen-without-twofa.component';
import { EnableTwofaWithoutPhoneComponent }
  from 'component/page/security/two-factor-authentication/enable/enable-twofa-without-phone/enable-twofa-without-phone.component';

import { CustomTwoFactorAuthenticateComponent }
  from 'component/page/security/two-factor-authentication/custom-two-factor-authenticate/custom-two-factor-authenticate.component';
import { CustomTwoFactorAuthenticateWithSmsComponent }
  from 'component/page/security/two-factor-authentication/custom-two-factor-authenticate-with-sms/custom-two-factor-authenticate-with-sms.component';
import { CustomTwoFactorAuthenticateWithGoogleAuthenticateComponent }
  from 'component/page/security/two-factor-authentication/custom-two-factor-authenticate-with-google-authenticate/custom-two-factor-authenticate-with-google-authenticate.component';

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
    ActivityDetail,
    LandingComponent,
    LogoutComponent,
    ProfileComponent,
    PagenotfoundComponent,
    MessageErrorInputComponent,
    UploadImageProfileComponent,
    UpdateProfileComponent,
    PreferencesComponent,
    ObjectivesComponent,
    AddressesComponent,
    ReportsComponent,
    ReportFormComponent,
    PriceComponent,
    PortfolioValueComponent,
    RecentActivityComponent,
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
    LockScreenConfigComponent,
    ResendSmsComponent,
    LockScreenComponent,
    AccountsComponent,
    JwPaginationComponent,
    DisableTwofaComponent,
    ApiAccessComponent,
    BuyWidgetsComponent,
    ApiKeysComponent,
    Oauth2AppComponent,
    ApiAccessNotificationComponent,
    ListApiKeysComponent,
    NewApiKeyComponent,
    ShowApiKeyComponent,
    DeleteApiKeyComponent,
    EnableApiKeyComponent,
    DisableApiKeyComponent,
    EditApiKeyComponent,
    ShowApiKeyWithTwofaComponent,
    ShowApiKeyWithoutTwofaComponent,
    EditApiKeyWithTwofaComponent,
    EditApiKeyWithoutTwofaComponent,
    PaginationComponent,
    NewApiKeyWithTwofaComponent,
    NewApiKeyWithoutTwofaComponent,
    DisableApiKeyWithTwofaComponent,
    DisableApiKeyWithoutTwofaComponent,
    EnableApiKeyWithTwofaComponent,
    EnableApiKeyWithoutTwofaComponent,
    DeleteApiKeyWithTwofaComponent,
    DeleteApiKeyWithoutTwofaComponent,
    LockScreenWithTwofaComponent,
    LockScreenWithoutTwofaComponent,
    EnableTwofaWithoutPhoneComponent,
    CustomTwoFactorAuthenticateComponent,
    CustomTwoFactorAuthenticateWithSmsComponent,
    CustomTwoFactorAuthenticateWithGoogleAuthenticateComponent,
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    // Reactive Forms Module
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    QRCodeModule,
    ClipboardModule,

    // Font
    AngularFontAwesomeModule,

    // Redirect VakaId
    // Chartjs
    ChartsModule,

    // Redirect VakaId
    OAuthModule.forRoot(),

    // Bootstrap dropdow module
    BsDropdownModule.forRoot(),

    // modal
    NgxSmartModalModule.forRoot(),

    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    NgxPaginationModule
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
