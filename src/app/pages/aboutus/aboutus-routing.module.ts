import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusSaveComponent } from './aboutus-save/aboutus-save.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path: '',
    component: AboutusComponent
  },
  {
    path: ':_id',
    component: AboutusSaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule { }
