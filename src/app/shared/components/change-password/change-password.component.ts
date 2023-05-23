import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  myForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public formBuilder: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

  }

  get controls() { return this.myForm.controls; }

  ngOnInit() {
    //
  }

  onAction(action: boolean): void {
    if (action) {
      if (this.myForm.invalid) {
        this.myForm.controls.confirmPassword.markAsDirty();
        return;
      }
      if (this.myForm.value.password !== this.myForm.value.confirmPassword) {
        this.notificationService.error('Password does not match');
        return;
      }
      this.dialogRef.close(this.myForm.value.password);
    } else {
      this.dialogRef.close(null);
    }
  }
}
