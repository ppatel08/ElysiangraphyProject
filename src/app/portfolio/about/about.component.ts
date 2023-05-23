import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/api/services/aboutus.service';
import { AlbumService } from 'src/app/api/services/album.service';
import { SharedService } from 'src/app/service/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutUs: any;
  albums: any;
  API_ENDPOINT = environment.apiEndpoint;

  constructor(private aboutUsService: AboutusService,
    private albumService: AlbumService,
    public root: SharedService) { }

  ngOnInit(): void {
    this.getAboutUs();
    this.getAlbums();

  }

  getAboutUs() {
    this.aboutUsService.getAboutUs().subscribe(data => {
      if (data.result) {
        this.aboutUs = data.result;
        this.aboutUs.myPicImageLink = this.root.getImageUrl(this.aboutUs.whoiam_image)
        this.aboutUs.myworkImageLink = this.root.getImageUrl(this.aboutUs.whatido_image)
      }
    })
  }

  getAlbums() {
    this.albumService.getAlbums({ sortBy: 'createdAt', sortOrder: 'desc' }).subscribe((data: any) => {
      if (data.result) {
        this.albums = data.result.content
        this.albums.forEach((e: any) => {
          e.imageLink = this.root.getImageUrl(e.thumbnail)
        });
        // setTimeout(() => {
        //   (<any>window).myCarousal();
        //   (<any>window).pageLayout();
        //   (<any>window).myThemeJs();
        // }, 100)
      }
    })
  }


}
