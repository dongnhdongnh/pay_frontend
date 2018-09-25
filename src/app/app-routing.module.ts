import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//Custom component
import { RegisterComponent } from './vakapay.component/authenticate/register/register.component';
import { LoginComponent } from './vakapay.component/authenticate/login/login.component';
import { VerifyComponent } from './vakapay.component/authenticate/verify/verify.component';

//Init routes
const routes: Routes = [
	{ path: '', component: RegisterComponent, data: { title: 'Wellcome' } },
	{ path: 'register', component: RegisterComponent, data: { title: 'Register' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } },
	{ path: 'verify', component: VerifyComponent, data: { title: 'Verify' } },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule { }
