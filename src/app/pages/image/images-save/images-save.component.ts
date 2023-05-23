import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from 'src/app/api/services/images.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-images-save',
  templateUrl: './images-save.component.html',
  styleUrls: ['./images-save.component.css']
})
export class ImagesSaveComponent implements OnInit {

  imageForm: FormGroup
  submitted = false;
  _id: string = '';

  images: any;

  uploadfile: any

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private imagesService: ImagesService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.imageForm = this.formBuilder.group({
      albumId: ['', [Validators.required]],
      image: ['', []],
    });
  }

  get controls() { return this.imageForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id != '0') {
        this._id = params._id;
        this.getImages(this._id);
      }
    });
  }


  getImages(_id: any) {
    this.imagesService.getImagesById(_id).subscribe(data => {
      this.images = data.result;
      this.imageForm.patchValue(this.images);
    });
  }

  
  submitForm() {
    this.submitted = true;
    if (this.imageForm.invalid) {
      return;
    }

    const formData = this.imageForm.value;
    var data = new FormData();
    data.append('data', JSON.stringify(formData));

    if (this.uploadfile) {
      for (const file of this.uploadfile) {
        data.append('image', file, file.name);
      }
    }

    if (this._id && this._id.length > 0) {
      this.imagesService.update(this._id, data).subscribe(res => {
        this.notificationService.success('Updated Successfully');
        this.back();
      });
    } else {
      this.imagesService.insert(data).subscribe(res => {
        this.notificationService.success('Inserted Successfully');
        this.back();
      });
    }
  }

  
  handleUploadImageInput(files: any) {
    this.uploadfile = files.files;
  }

  back() {
    this.router.navigate(['/admin/dashboard/images']);
  }
}
