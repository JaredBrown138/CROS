import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { UserManagementComponent } from '../../components/user-management/user-management.component';
import { SecurityQuestionsComponent } from '../../components/security-questions/security-questions.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'users', component: UserManagementComponent }
  { path: 'questions', component: SecurityQuestionsComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
