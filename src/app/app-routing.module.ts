import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//Custom component
import { RegisterComponent } from './vakapay.component/authenticate/register/register.component';
import { LoginComponent } from './vakapay.component/authenticate/login/login.component';

//Init routes
const routes: Routes = [
	{ path: '', component: RegisterComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
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
