import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';

//Add libriary
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule,

    //Font
    AngularFontAwesomeModule,

    //Redirect VakaId
    OAuthModule.forRoot(),

    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
