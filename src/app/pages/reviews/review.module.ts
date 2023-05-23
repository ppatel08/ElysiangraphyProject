import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ReviewsRoutingModule } from "./review-routing.module";
import { ReviewsSaveComponent } from "./reviews-save/reviews-save.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { ReviewsViewComponent } from './reviews-view/reviews-view.component';
import { SendFeedbackLinkComponent } from './send-feedback-link/send-feedback-link.component';


@NgModule({
    declarations: [
        ReviewsComponent,
        ReviewsSaveComponent,
        ReviewsViewComponent,
        SendFeedbackLinkComponent,
    ],
    imports: [
        CommonModule,
        ReviewsRoutingModule,
        SharedModule
    ],
    entryComponents: [
        SendFeedbackLinkComponent
    ]
})
export class ReviewsModule { }