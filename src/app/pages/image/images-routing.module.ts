import { NgModule } from '@angular/core';
import { ImagesComponent } from './images/images.component';
import { ImagesSaveComponent } from './images-save/images-save.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent
  },
  {
    path: ':_id',
    component: ImagesSaveComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
