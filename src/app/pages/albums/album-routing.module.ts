import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsSaveComponent } from './albums-save/albums-save.component';
import { AlbumsViewComponent } from './albums-view/albums-view.component';
import { AlbumsComponent } from './albums/albums.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent
  },
  {
    path: ':_id',
    component: AlbumsSaveComponent
  },
  {
    path: ':_id/view',
    component: AlbumsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
