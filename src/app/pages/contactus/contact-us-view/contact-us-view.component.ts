import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactusService } from 'src/app/api/services/contactus.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contact-us-view',
  templateUrl: './contact-us-view.component.html',
  styleUrls: ['./contact-us-view.component.css']
})
export class ContactUsViewComponent implements OnInit {

  _id: string = '';
  inquiryData:any;
  isEdit= false;
  newStatus:any;
  status =  ['New', 'InProgress', 'Closed', 'Converted']
  constructor(private activatedRoute: ActivatedRoute,
    private contactusService: ContactusService,
    private router: Router,
    private notificationService: NotificationService,) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.getContact(this._id);
      } else {
        this.back();
      }
    });
  }

  getContact(_id: any) {
    this.contactusService.getContactusById(_id).subscribe(data => {
      this.inquiryData = data.result;
    });
  }

  back() {
    this.router.navigate(['/admin/dashboard/contactus']);
  }

  editStatus() {
    this.isEdit = true;
    this.newStatus = this.inquiryData.status;
  }

  cancel() {
    this.isEdit = false;
  }

  updateStatus() {
    this.isEdit = false;
    this.contactusService.updateStatus(this._id, this.newStatus).subscribe(res=>{
      this.notificationService.success('Success')
      this.getContact(this._id);
    });
    
  }
}
