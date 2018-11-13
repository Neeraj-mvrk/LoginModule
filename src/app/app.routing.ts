import { NgModule } from '@angular/core';
 import { Routes, RouterModule,CanActivate } from '@angular/router';
 import { SignupFormComponent } from './signup-form/signup-form.component';
 import { GoogleDataComponent } from './google-data/google-data.component';
 import { LoginFormComponent } from './login-form/login-form.component';
 import { FirstPageComponent } from './first-page/first-page.component';
 import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';
 const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'login-form' },
   { path: 'signup-form', component: SignupFormComponent },
    { path: 'login-form', component: LoginFormComponent },
    { path: 'googleData', component: GoogleDataComponent },
    { path: 'first_page', component: FirstPageComponent,canActivate: [AuthGuard]},
 ];

 @NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
 })
 export class AppRoutingModule { }

 export const routingComponents = [SignupFormComponent,LoginFormComponent,FirstPageComponent,GoogleDataComponent];
