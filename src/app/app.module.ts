import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
// Import ReactiveFormsModule
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';


// Add libriary
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// ng-select
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';

// RECOMMENDED (doesn't work with system.js)
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Add libriary font
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Add routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Component parent
import { AppComponent } from './app.component';

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

// VakaId Login
import { OAuthModule } from 'angular-oauth2-oidc';
import { LandingComponent } from 'component/landing/landing.component';
import { LogoutComponent } from 'component/authenticate/logout/logout.component';
import { PagenotfoundComponent } from 'component/page/pagenotfound/pagenotfound.component';
import { MessageErrorInputComponent } from 'component/system/message-error-input/message-error-input.component';
import { UploadImageProfileComponent } from 'component/page/profile/upload-image-profile/upload-image-profile.component';
import { UpdateProfileComponent } from 'component/page/profile/update-profile/update-profile.component';
import { ProfileComponent } from 'component/page/profile/profile.component';
import { PreferencesComponent } from 'component/page/preferences/preferences.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { AddressesComponent } from '../vakapay.component/addresses/addresses.component';
import { ReportsComponent } from '../vakapay.component/reports/reports.component';
import { ReportFormComponent } from '../vakapay.component/report-form/report-form.component';
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
    ObjectivesComponent,
    AddressesComponent,
    ReportsComponent,
    ReportFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule,
    // Reactive Forms Module
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,

    // Font
    AngularFontAwesomeModule,

    // Redirect VakaId
    OAuthModule.forRoot(),

    // Bootstrap dropdow module
    BsDropdownModule.forRoot(),

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
