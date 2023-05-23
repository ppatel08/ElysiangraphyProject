import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorySaveComponent } from './category-save/category-save.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
  {
    path: ':_id',
    component: CategorySaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
