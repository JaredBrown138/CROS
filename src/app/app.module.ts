import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SecurityQuestionsComponent } from './components/security-questions/security-questions.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrderComponent } from './components/order/order.component';
import { LogComponent } from './components/log/log.component';
import { StatsComponent } from './components/stats/stats.component';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        SecurityQuestionsComponent,
        UserManagementComponent,
        DashboardComponent,
        NotFoundComponent,
        ServerErrorComponent,
        RegisterComponent,
        PasswordResetComponent,
        AboutUsComponent,
        ContactComponent,
        OrderComponent,
        LogComponent,
        StatsComponent,
        HomepageComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatTableModule,
        MatTooltipModule,
        MatExpansionModule,
        MatSelectModule,
        MatStepperModule,
        MatProgressBarModule,
        ChartsModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
