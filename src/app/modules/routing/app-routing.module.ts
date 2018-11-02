import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { UserManagementComponent } from '../../components/user-management/user-management.component';
import { SecurityQuestionsComponent } from '../../components/security-questions/security-questions.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { ServerErrorComponent } from '../../components/server-error/server-error.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'questions', component: SecurityQuestionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', redirectTo: '/404' },

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
