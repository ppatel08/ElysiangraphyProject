import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImagesComponent } from './images/images.component';
import { ImagesSaveComponent } from './images-save/images-save.component';
import { ImagesRoutingModule } from './images-routing.module';


@NgModule({
  declarations: [
    ImagesComponent,
    ImagesSaveComponent
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    SharedModule
  ]
})
export class ImagesModule { }
