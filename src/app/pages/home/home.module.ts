import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardComponent, DashboardContainerComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ThemeModule,
    NgChartsModule,
  ]
})
export class HomeModule { }
