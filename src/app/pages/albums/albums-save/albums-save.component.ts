import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/api/services/album.service';
import { CategoriesService } from 'src/app/api/services/categories.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-albums-save',
  templateUrl: './albums-save.component.html',
  styleUrls: ['./albums-save.component.css']
})
export class AlbumsSaveComponent implements OnInit {

  albumsForm: FormGroup | any
  submitted = false;
  _id: string = '';
  categoryid: string = '';

  albumsData: any;
  categoryData: any[] = [];

  thumbnailImage: any;
  coverImage: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private albumsService: AlbumService,
    private categoryService: CategoriesService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.albumsForm = formBuilder.group({
      categoryId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnailUrl: ['', []],
      coverImageUrl: ['', []]
    });
  }

  get controls() { return this.albumsForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id != '0') {
        this._id = params._id;
        this.getAlbums();
      }
    });
    this.getCategoryList()
  }


  getAlbums() {
    this.albumsService.getAlbumById(this._id).subscribe(data => {
      this.albumsData = data.result;
      this.albumsForm.patchValue(this.albumsData);
    });
  }

  getCategoryList() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryData = data.result.content;
      console.log(this.categoryData);

    });
  }

  submitForm() {
    this.submitted = true;
    if (this.albumsForm.invalid) {
      return;
    }

    const formData = this.albumsForm.value;
    var data = new FormData();

    if(this.thumbnailImage) {
      data.append('thumbnail', this.thumbnailImage)
    }

    if(this.coverImage) {
      data.append('cover', this.coverImage);
    }

    data.append('data', JSON.stringify(formData));

    if (this._id) {
      this.albumsService.update(this._id, data).subscribe(res => {
        this.notificationService.success('Updated Successfully');
        this.back();
      });
    } else {
      this.albumsService.insert(data).subscribe(res => {
        this.notificationService.success('Inserted Successfully');
        this.back();
      });
    }
  }

  onChange(event: any) {

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
    if(this._id) {
      this.router.navigate([`/admin/dashboard/albums/${this._id}/view`]);
    } else {
      this.router.navigate([`/admin/dashboard/albums`]);
    }
    
  }

}