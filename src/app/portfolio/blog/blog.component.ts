import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/api/services/reviews.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  reviewsData: any;


  constructor(
    private reviewService: ReviewsService
  ) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getActiveReviews({ isActive: true }).subscribe((data: any) => {
      if (data.result) {
        this.reviewsData = data.result.content;
        setTimeout(() => {
          for (let i = 0; i < this.reviewsData.length; i++) {
            (window as any).document.getElementById(this.reviewsData[i]._id + 'star' + this.reviewsData[i].rate).click();
          }
          (<any>window).myCarousal();
          (<any>window).pageLayout();
          (<any>window).myThemeJs();
        }, 500);
      }
    });
  }

}
