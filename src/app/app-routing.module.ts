import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//Custom component
import { RegisterComponent } from 'component/authenticate/register/register.component';
import { LoginComponent } from 'component/authenticate/login/login.component';
import { VerifyComponent } from 'component/authenticate/verify/verify.component';
import { DashboardComponent } from 'component/dashboard/dashboard.component';
import { IndexComponent } from 'component/page/index/index.component';

import { AuthGuard } from 'guards/auth.guard';
import { LoginGuard } from 'guards/login.guard'


//Init routes
const routes: Routes = [
	{ 
		path: '', 
		component: LoginComponent, 
		canActivate: [LoginGuard],
		data: { title: 'Wellcome' } },
	{ 
		
		path: 'register', 
		component: RegisterComponent, 
		canActivate: [LoginGuard],
		data: { title: 'Register' } },
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoginGuard],
		data: { title: 'Login' },
	},
	{
		path: "signin",
		redirectTo: "login"
	},
	{
		path: "signup",
		redirectTo: "register"
	},
	{ 
		path: 'verify', 
		component: VerifyComponent, 
		canActivate: [LoginGuard],
		data: { title: 'Verify' } },
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: IndexComponent,
				data: { title: 'Index' }
			}
		]
	},
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
