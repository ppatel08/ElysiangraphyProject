import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsSaveComponent } from './reviews-save/reviews-save.component';
import { ReviewsViewComponent } from './reviews-view/reviews-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent
  },
  {
    path: ':_id',
    component: ReviewsSaveComponent
  },
  {
    path: ':_id/view',
    component: ReviewsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
