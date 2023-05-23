import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus/contactus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImagesComponent } from './image/images/images.component';
import { PagesComponent } from './pages.component';
import { ReviewsComponent } from './reviews/reviews/reviews.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'sample',
        component: SampleComponent
      },
      {
        path: 'contactus',
        loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule) 
      },
      {
        path: 'reviews',
        loadChildren: () => import('./reviews/review.module').then(m => m.ReviewsModule)
      },
      {
        path: 'images',
        loadChildren: () => import('./image/images.module').then(m => m.ImagesModule) 
      },
      {
        path: 'aboutus',
        loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutusModule) 
      },
      {
        path: 'albums',
        loadChildren: () => import('./albums/album.module').then(m => m.AlbumsModule) 
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
