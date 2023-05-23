import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReviewsService } from 'src/app/api/services/reviews.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PaginationParams } from 'src/app/shared/pagination-params';
import { SendFeedbackLinkComponent } from '../send-feedback-link/send-feedback-link.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  _id: any = '';
  reviews: any = [];
  params: PaginationParams = {
    pageNo: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };
  resultsLength = 0;

  displayedColumns: string[] = ['id', 'customer_name', 'customer_email', 'review_content', 'rate', 'isActive', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private reviewsService: ReviewsService,
    private matDialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.params.pageSize = this.paginator.pageSize;
    }
    this.setTable();
    this.getReviews();
  }

  pageChange(pageEvent: PageEvent) {
    this.params.pageSize = pageEvent.pageSize;
    this.params.pageNo = pageEvent.pageIndex + 1;
    this.getReviews();
  }

  sortChange(value: Sort) {
    this.params.sortBy = value.active;
    this.params.sortOrder = value.direction ? value.direction : null;
    this.getReviews();
  }

  setTable(result: any = { content: [], count: 0 }) {
    this.resultsLength = result.count;
    this.dataSource = new MatTableDataSource(result.content);
  }

  getReviews() {
    this.reviewsService.getReviews().subscribe(data => {
      if (data.result) {
        this.reviews = data.result.content;
        this.setTable({ content: data.result.content, count: data.result.content.length });
      }
    })
  }

  changeStatus(element: any, event: any) {
    const status = event.checked ? 'Approve' : 'Rejct';
    this.matDialog.open(ConfirmationComponent, {
      data: {
        message: `Are you sure you want to ${status} this review?`
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        this.reviewsService.updateStatus(element._id, status == 'Approve' ? true : false).subscribe((res) => {
          this.getReviews()
        }, ((err) => {
          element.isActive = !element.isActive;
        })
        )
      } else {
        element.isActive = !element.isActive;
      }
    });
  }

  view(_id: any) {
    this.router.navigate([`/admin/dashboard/reviews/${_id}/view`]);
  }

  delete(_id: any) {
    this.matDialog.open(ConfirmationComponent, {
      data: { title: 'Delete Review', message: 'Do you really want to delete this review ?' }
    }).afterClosed().subscribe((result) => {
      if (result === true) {
        this.reviewsService.delete(_id).subscribe(() => {
          this.notificationService.success('Review has been deleted successfully');
          this.getReviews();
        });
      }
    });
  }

  sendFeedbackLink() {
    this.matDialog.open(SendFeedbackLinkComponent, {
      data: {  }
    }).afterClosed().subscribe((result) => {
    });
  }
}
