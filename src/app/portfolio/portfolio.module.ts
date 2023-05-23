import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { PortfolioShowcaseComponent } from './portfolio-showcase/portfolio-showcase.component';
import { AlbumsArchiveComponent } from './albums-archive/albums-archive.component';
import { AboutComponent } from './about/about.component';
import { GallarySingleComponent } from './gallary-single/gallary-single.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { FeedbackComponent } from './feedback/feedback.component';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    PortfolioRoutingModule
  ],
  declarations: [
    LandingComponent,
    PortfolioShowcaseComponent,
    AlbumsArchiveComponent,
    AboutComponent,
    GallarySingleComponent,
    BlogComponent,
    ContactComponent,
    PortfolioComponent,
    FeedbackComponent
  ],
  providers: []
})

export class PortfolioModule {}
