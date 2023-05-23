import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewsService } from 'src/app/api/services/reviews.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-send-feedback-link',
  templateUrl: './send-feedback-link.component.html',
  styleUrls: ['./send-feedback-link.component.css']
})
export class SendFeedbackLinkComponent implements OnInit {

  myForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<SendFeedbackLinkComponent>,
    public formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private reviewService: ReviewsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.myForm = this.formBuilder.group({
      customer_email: ['', [Validators.required, Validators.email]],
    });

  }

  get controls() { return this.myForm.controls; }

  ngOnInit() {
    //
  }

  onAction(action: boolean): void {
    
    if (action) {
      this.submitted = true;
      if (this.myForm.invalid) {
        return;
      }
      this.reviewService.sendFeedbackLink(this.myForm.value).subscribe(res=>{
        this.notificationService.success('Feedbank link has been sent');
        this.dialogRef.close('Y');
      })
    } else {
      this.dialogRef.close(null);
    }
  }

}
