import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { ContactusSaveComponent } from './contactus-save/contactus-save.component';
import { ContactUsViewComponent } from './contact-us-view/contact-us-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContactusComponent
  },
  {
    path: ':_id',
    component: ContactusSaveComponent
  },
  {
    path: ':_id/view',
    component: ContactUsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class contactusRoutingModule { }
