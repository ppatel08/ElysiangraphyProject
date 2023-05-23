import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from 'src/app/api/services/reviews.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-reviews-save',
  templateUrl: './reviews-save.component.html',
  styleUrls: ['./reviews-save.component.css']
})
export class ReviewsSaveComponent implements OnInit {

  reviewForm: FormGroup
  submitted = false;
  _id: string = '';

  reviewData: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private reviewsService: ReviewsService,
    private router: Router,
    private notificationService: NotificationService,

  ) {
    this.reviewForm = formBuilder.group({
      customer_name: ['', [Validators.required]],
      customer_email: ['', [Validators.required]],
      review_content: ['', [Validators.required]],
      rate: ['', [Validators.required]],
    });
  }

  get controls() { return this.reviewForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id != '0') {
        this._id = params._id;
        this.getReview(this._id);
      }
    });
  }


  getReview(_id: any) {
    this.reviewsService.getReview(_id).subscribe(data => {
      this.reviewData = data.result;
      this.reviewForm.patchValue(this.reviewData);
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.reviewForm.invalid) {
      return;
    }
    const formData = this.reviewForm.value;
    if (this._id.length > 0) {
      this.reviewsService.update(this._id, formData).subscribe(res => {
        this.notificationService.success('Updated Successfully');
        this.back();
      });
    } else {
      this.reviewsService.insert(formData).subscribe(res => {
        this.notificationService.success('Inserted Successfully');
        this.back();
      });
    }
  }

  back() {
    this.router.navigate(['/admin/dashboard/reviews']);
  }
}
