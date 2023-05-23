import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/api/services/categories.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.component.html',
  styleUrls: ['./category-save.component.css']
})
export class CategorySaveComponent implements OnInit {

  categoryForm: FormGroup | any;
  submitted = false;
  _id: string = '';

  categoryData: any;

  thumbnailImage:any;
  coverImage:any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private router: Router,
    private notificationService: NotificationService,

  ) {
    this.categoryForm = formBuilder.group({
      name: ['', [Validators.required]],
      thumbnailUrl: ['', []],
      coverImageUrl: ['', []],
    });
  }

  get controls() { return this.categoryForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id != '0') {
        this._id = params._id;
        this.getCategory(this._id);
      }
    });
  }

  getCategory(_id: any) {
    this.categoryService.getCategoryById(_id).subscribe(data => {
      this.categoryData = data.result;
      this.categoryForm.patchValue(this.categoryData);
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }

    const formData = this.categoryForm.value;

    var data = new FormData();
    if(this.thumbnailImage) {
      data.append('thumbnail', this.thumbnailImage)
    }

    if(this.coverImage) {
      data.append('coverImage', this.coverImage);
    }

    data.append('data', JSON.stringify(formData));

    if (this._id) {
      this.categoryService.update(this._id, data).subscribe(res => {
        this.notificationService.success('Catagory is updated successfully');
        this.back();
      });
    } else {
      this.categoryService.insert(data).subscribe(res => {
        this.notificationService.success('Catagory is created successfully');
        this.back();
      });
    }
  }

  handleUploadThumbnailImageInput(event: any) {
    if (event.files.length > 0) {
      this.thumbnailImage = event.files[0];
    }
  }

  handleUploadCoverImageInput(event: any) {
    if (event.files.length > 0) {
      this.coverImage = event.files[0];
    }
  }

  back() {
    this.router.navigate(['/admin/dashboard/category']);
  }
}

