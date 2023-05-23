import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategorySaveComponent } from "./category-save/category-save.component";
import { CategoryComponent } from "./category/category.component";


@NgModule({
    declarations: [
        CategoryComponent,
        CategorySaveComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        SharedModule
    ]
})
export class CategoryModule { }