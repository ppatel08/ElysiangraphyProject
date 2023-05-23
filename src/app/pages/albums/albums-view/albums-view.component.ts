import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/api/services/album.service';
import { ImagesService } from 'src/app/api/services/images.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/service/shared.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-albums-view',
  templateUrl: './albums-view.component.html',
  styleUrls: ['./albums-view.component.css']
})
export class AlbumsViewComponent implements OnInit {


  _id: string = '';
  albumsData: any;
  imagesData: any = [];
  isEdit = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private albumsService: AlbumService,
    private imageService: ImagesService,
    private router: Router,
    private notificationService: NotificationService,
    public root: SharedService,
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.getAlbums(this._id);
      } else {
        this.back();
      }
    });
    setTimeout(() => {
      (<any>window).pageLayout();
    }, 500)
  }

  getAlbums(_id: any) {
    this.albumsService.getAlbumById(_id).subscribe(data => {
      this.albumsData = data.result;
    });
    this.getImages();
  }

  getImages() {
    this.imageService.getImages({albumId: this._id}).subscribe(data => {
      console.log(data.result.content);
      this.imagesData = data.result.content;
    });
    console.log('imagesData==>',this.imagesData);
  }

  onComplete(data:any) {
    this.notificationService.success('Uploaded successfully');
    this.getImages();

  }

  edit() {
    this.router.navigate([`/admin/dashboard/albums/${this._id}`]);
  }

  back() {
    this.router.navigate(['/admin/dashboard/albums']);
  }

  delete(_id: any) {
    this.matDialog.open(ConfirmationComponent, {
      data: { title: 'Delete Image ', message: 'Do you really want to delete this image ?' }
    }).afterClosed().subscribe((result) => {
      if (result === true) {
        this.imageService.delete(_id).subscribe(() => {
          this.notificationService.success('Image has been deleted successfully');
          this.getAlbums(this._id);
        });
      }
    });
  }

  
}
