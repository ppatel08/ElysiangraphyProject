import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutusService } from 'src/app/api/services/aboutus.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-aboutus-save',
  templateUrl: './aboutus-save.component.html',
  styleUrls: ['./aboutus-save.component.css']
})
export class AboutusSaveComponent implements OnInit {

  aboutusForm: FormGroup | any
  submitted = false;
  _id: string = '';

  aboutusData: any;

  whoIamImage:any;
  whatIdoImage:any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private aboutusService: AboutusService,
    private router: Router,
    private notificationService: NotificationService,

  ) {
    this.aboutusForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      title: ['', [Validators.required]],
      whoiam_title: ['', [Validators.required]],
      whoiam_imageUrl: ['', []],
      whoiam_subtitle: ['', [Validators.required]],
      whoiam_description: ['', [Validators.required]],
      // whatido_imageUrl: ['', []],
      // whatido_title: ['', [Validators.required]],
      // whatido_subtitle: ['', [Validators.required]],
      // whatido_description: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      // google_map_script: ['', []],
      tagline_heading: ['', [Validators.required]],
      tagline_description: ['', [Validators.required]],
      fb_link: ['', []],
      twitter_link: ['', []],
      instagram_link: ['', []],
      youtubeLink: ['', []]
    });
  }

  get controls() { return this.aboutusForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id != '0') {
        this._id = params._id;
        this.getAboutus();
      }
    });
  }

  getAboutus() {
    this.aboutusService.getAboutUs().subscribe(data => {
      this.aboutusData = data.result;
      this.aboutusForm.patchValue(this.aboutusData);
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.aboutusForm.invalid) {
      return;
    }

    const formData = this.aboutusForm.value;
    var data = new FormData();

    if (this.whoIamImage) {
      data.append('whoiam_image', this.whoIamImage);
    }

    if (this.whatIdoImage) {
      data.append('whatido_image', this.whatIdoImage);
    }
    data.append("data", JSON.stringify(formData));
    if (this._id) {
      this.aboutusService.update(this._id, data).subscribe(res => {
        this.notificationService.success('Updated Successfully');
        this.back();
      });
    } else {
      this.aboutusService.insert(data).subscribe(res => {
        this.notificationService.success('Inserted Successfully');
        this.back();
      });
    }
  }

  handleUploadWIMImageInput(event: any) {
    if (event.files.length > 0) {
      this.whoIamImage = event.files[0];
    }
  }

  handleUploadWIDImageInput(event: any) {
    if (event.files.length > 0) {
      this.whatIdoImage = event.files[0];
    }
  }

  back() {
    this.router.navigate(['/admin/dashboard/aboutus']);
  }

}