import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../theme/theme.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
  ],
  declarations: [
    PagesComponent,
    LoginComponent,
    DashboardComponent,
    SampleComponent
  ],
  providers: []
})

export class PagesModule { }
