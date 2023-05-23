import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumsArchiveComponent } from './albums-archive/albums-archive.component';
import { BlogComponent } from './blog/blog.component';
import { GallarySingleComponent } from './gallary-single/gallary-single.component';
import { LandingComponent } from './landing/landing.component';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioShowcaseComponent } from './portfolio-showcase/portfolio-showcase.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    children: [
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'portfolio',
        component: PortfolioShowcaseComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'album/:id',
        component: AlbumsArchiveComponent
      },
      {
        path: 'gallery/:id',
        component: GallarySingleComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
