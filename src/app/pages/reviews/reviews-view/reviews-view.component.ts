import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from 'src/app/api/services/reviews.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-reviews-view',
  templateUrl: './reviews-view.component.html',
  styleUrls: ['./reviews-view.component.css']
})
export class ReviewsViewComponent implements OnInit {

  _id: string = '';
  reviewData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewsService: ReviewsService,
    private router: Router,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.getReview(this._id);
      } else {
        this.back();
      }
    });
  }

  getReview(_id: any) {
    this.reviewsService.getReview(_id).subscribe(data => {
      this.reviewData = data.result;
    });
  }

  changeStatus(value: any) {
    const status = value ? 'Approve' : 'Reject';
    this.matDialog.open(ConfirmationComponent, {
      data: {
        message: `Are you sure you want to ${status} this feedback?`
      }
    }).afterClosed().subscribe(data => {
      if (data) {        
        this.reviewsService.updateStatus(this._id, value).subscribe((res) => { 
          this.getReview(this._id)
        })
        
      } else {
      }
    });
  }

  back() {
    this.router.navigate(['/admin/dashboard/reviews']);
  }

}
