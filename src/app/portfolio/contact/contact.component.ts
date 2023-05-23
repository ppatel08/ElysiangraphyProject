import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutusService } from 'src/app/api/services/aboutus.service';
import {ContactusService} from 'src/app/api/services/contactus.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  myForm: FormGroup;

  aboutUs: any;

  constructor(private formBuilder: FormBuilder,
    private contactUsService: ContactusService,
    private aboutUsService: AboutusService,
    private notificationService: NotificationService) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      customerEmail: ['', [Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getAboutUs()
    setTimeout(() => {
      (<any>window).myThemeJs();
    }, 100)
  }

  saveContact() {
    if(this.myForm.invalid){
      return;
    }

    const value = this.myForm.value

    this.contactUsService.insert(value).subscribe(() => {
      this.notificationService.success('Your inquiry has been submitted. Our team will contact you soon!');
      this.myForm.reset({});
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
