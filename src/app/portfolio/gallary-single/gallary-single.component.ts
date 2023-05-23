import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/api/services/album.service';
import { ImagesService } from 'src/app/api/services/images.service';
import { SharedService } from 'src/app/service/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallary-single',
  templateUrl: './gallary-single.component.html',
  styleUrls: ['./gallary-single.component.css']
})
export class GallarySingleComponent implements OnInit {

  albumId: any;
  albumImages: any;
  album: any;
  albums: any;
  API_ENDPOINT = environment.apiEndpoint;

  isLoaded = true;
  constructor(private activeRoute: ActivatedRoute,
    private imageService: ImagesService,
    private albumService: AlbumService,
    private router: Router,
    public root: SharedService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params.id) {
        this.albumId = params.id
        this.getImages(this.albumId)
      }
    });
    this.activeRoute.queryParams.subscribe(qparams => {
      if(qparams.d) {
        this.isLoaded = false;
        setTimeout(() => {
            this.isLoaded = true;
        }, 500);
      }
    });    
  }

  getImages(id: any) {
    this.imageService.getImages({ albumId: id }).subscribe((data: any) => {
      if (data.result) {
        this.albumImages = data.result.content
        this.albumImages.forEach((e: any) => {
          e.imageFileUrl = this.root.getImageUrl(e.image)
        });
      }
      this.getAlbum(this.albumId);
    })
  }

  getAlbum(id: any) {
    this.albumService.getAlbumById(id).subscribe((data: any) => {
      if (data.result) {
        this.album = data.result
        this.album.coverImageUrl = this.root.getImageUrl(this.album.cover)
        this.albumService.getAlbums({ categoryId: this.album?.categoryId, sortBy: 'createdAt', sortOrder: 'desc' }).subscribe((albumData: any) => {
          if (albumData.result) {
            this.albums = albumData.result.content.filter((x: any) => x._id != id);
            this.albums.forEach((e: any) => {
              e.imageLink = this.root.getImageUrl(e.thumbnail);
            });
            this.loadScript();
          }
        })
      }
    })
  }


  loadScript() {
    setTimeout(() => {
      (<any>window).pageLayout();
      (<any>window).myThemeJs();
      (<any>window).myCarousal();
      (<any>window).myLightGallery();
    }, 500)
  }

  openAlbumn(id: any) {
    this.router.navigate(['', 'gallery', id], { queryParams: {d: new Date().getTime().toString() }})
  }
}
