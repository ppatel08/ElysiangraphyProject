import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
