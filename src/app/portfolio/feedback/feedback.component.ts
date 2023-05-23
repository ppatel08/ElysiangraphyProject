import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AboutusService } from 'src/app/api/services/aboutus.service';
import { ReviewsService } from 'src/app/api/services/reviews.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  myForm: FormGroup;

  aboutUs: any;

  token:any;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private reviewService: ReviewsService,
    private aboutUsService: AboutusService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) {
    this.myForm = this.formBuilder.group({
      customer_name: ['', [Validators.required]],
      review_content: ['', [Validators.required]],
      rate: ['5', [Validators.required]],
    })

    this.route.queryParams.subscribe((params: Params) => {
      console.log(params.token);
      if(!params.token) {
        this.router.navigate(['/']);
      }
      this.token = params.token;
    });
  }

  get controls() { return this.myForm.controls; }

  ngOnInit(): void {
    this.getAboutUs()
    setTimeout(() => {
      (<any>window).myThemeJs();
    }, 100)
  }

  submit() {
    console.log("this.myForm.value", this.myForm);
    this.submitted = true;
    if(this.myForm.invalid){
      return;
    }

    let value = this.myForm.value;
    value.token = this.token;
    this.reviewService.insert(value).subscribe(() => {
      this.notificationService.success('Thanks for your feedback.');
      this.myForm.reset({});
      this.router.navigate(['/']);
    })
  }

  getAboutUs() {
    this.aboutUsService.getAboutUs().subscribe((data) => {
      if(data.result){
        this.aboutUs = data.result;
      }
    })
  }

}
