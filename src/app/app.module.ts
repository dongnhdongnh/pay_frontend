import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

//Add libriary
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


//Add routing
import { AppRoutingModule } from './app-routing.module';

//Component parent
import { AppComponent } from './app.component';

//Component children
import { RegisterComponent } from './vakapay.component/authenticate/register/register.component';
import { LoginComponent } from './vakapay.component/authenticate/login/login.component';
import { HeaderAuthenticateComponent } from './vakapay.component/authenticate/header-authenticate/header-authenticate.component';
import { LoadingComponent } from './vakapay.component/loading/loading.component';

//Service
// import { InMemoryDataService } from './vakapay.core/vakapay.memory/in-memory-data/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderAuthenticateComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule,

    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
