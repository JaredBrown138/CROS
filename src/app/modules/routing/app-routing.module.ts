import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { UserManagementComponent } from '../../components/user-management/user-management.component';
import { SecurityQuestionsComponent } from '../../components/security-questions/security-questions.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { ServerErrorComponent } from '../../components/server-error/server-error.component';
import { RegisterComponent } from '../../components/register/register.component';
import { PasswordResetComponent } from '../../components/password-reset/password-reset.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { HomepageComponent } from '../../components/homepage/homepage.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'questions', component: SecurityQuestionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resetpassword', component: PasswordResetComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '**', redirectTo: '/404' },

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
