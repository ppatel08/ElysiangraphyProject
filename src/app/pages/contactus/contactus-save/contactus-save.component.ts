import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactusService } from 'src/app/api/services/contactus.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contactus-save',
  templateUrl: './contactus-save.component.html',
  styleUrls: ['./contactus-save.component.css']
})
export class ContactusSaveComponent implements OnInit {

  contactusForm: FormGroup
  submitted = false;
  _id: string = '';

  contactData: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private contactusService: ContactusService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.contactusForm = formBuilder.group({
      name: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      status: [true, []]
    });
  }

  get controls() { return this.contactusForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id != '0') {
        this._id = params._id;
        this.getContact(this._id);
      }
    });
  }

  getContact(_id: any) {
    this.contactusService.getContactusById(_id).subscribe(data => {
      this.contactData = data.result;
      this.contactusForm.patchValue(this.contactData);
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.contactusForm.invalid) {
      return;
    }
    const formData = this.contactusForm.value;
    if (this._id.length > 0) {

      // this.contactusService.update(this._id, formData).subscribe(res => {
      //   this.notificationService.success('Updated Successfully');
      //   this.back();
      // });
    } else {
      // this.contactusService.insert(formData).subscribe(res => {
      //   this.notificationService.success('Inserted Successfully');
      //   this.back();
      // });
    }
  }

  back() {
    this.router.navigate(['/admin/dashboard/contactus']);
  }
}
