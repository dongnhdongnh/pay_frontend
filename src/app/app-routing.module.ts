import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from 'guards/auth.guard';
import { LoginGuard } from 'guards/login.guard'

//Custom component
import { LogoutComponent } from 'component/authenticate/logout/logout.component';
import { RegisterComponent } from 'component/authenticate/register/register.component';
import { LoginComponent } from 'component/authenticate/login/login.component';
import { VerifyComponent } from 'component/authenticate/verify/verify.component';
import { DashboardComponent } from 'component/dashboard/dashboard.component';
import { IndexComponent } from 'component/page/index/index.component';
import { LandingComponent } from 'component/landing/landing.component';
import { ProfileComponent } from 'component/page/profile/profile.component';
import { PagenotfoundComponent } from 'component/page/pagenotfound/pagenotfound.component';
import { PreferencesComponent } from 'component/page/preferences/preferences.component';
import { SecurityComponent } from 'component/page/security/security.component';
import { ActivityComponent } from 'component/page/activity/activity.component';
import { LockScreenComponent } from 'component/lock-screen/lock-screen.component';
import { LockGuard } from 'guards/lock.guard';

import { AccountsComponent } from 'component/page/accounts/accounts.component';
//Init routes
const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
		data: { title: 'Welcome' }
	},
	{

		path: 'register',
		component: RegisterComponent,
		canActivate: [LoginGuard],
		data: { title: 'Register' }
	},
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
		data: { title: 'Verify' }
	},
	{
		path: 'logout',
		component: LogoutComponent,
		data: { title: 'Logout' }
	},
	{
		path: 'account-is-lock',
		canActivate: [LockGuard],
		component: LockScreenComponent,
		data: { title: 'Lock Screen' }
	},
	{
		path: '',
		component: DashboardComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				component: IndexComponent,
				data: { title: 'Index' }
			},			
			{
				path: 'profile',
				component: ProfileComponent,
				data: { title: 'Profile' }
			},
			{
				path: 'preferences',
				component: PreferencesComponent,
				data: { title: 'Preferences' }
			},
			{
				path: 'security',
				component: SecurityComponent,
				data: { title: 'Security' }
			},
			{
				path: 'activity',
				component: ActivityComponent,
				data: { title: 'Activity' }
			},
			{
				path: 'account',
				component: AccountsComponent,
				data: { title: 'accounts' }
			},
		]
	},
	{ path: '404', component: PagenotfoundComponent },
	{ path: '**', redirectTo: '/404' },
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
