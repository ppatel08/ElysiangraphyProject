import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/api/services/aboutus.service';
import { AlbumService } from 'src/app/api/services/album.service';
import { SharedService } from 'src/app/service/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  aboutUs: any;
  albums: any;
  API_ENDPOINT = environment.apiEndpoint;

  constructor(private albumService: AlbumService,
    private aboutUsService: AboutusService,
    public root: SharedService) {}


  ngOnInit(): void {
    this.getAlbums()
    this.getAboutUs()
    setTimeout(() => {
      (<any>window).pageLayout();
      (<any>window).myThemeJs();
      (<any>window).myFooter();
    }, 500);
  }


  getAlbums() {
    this.albumService.getCarousal().subscribe((data:any) => {
      if(data.result){
        this.albums = data.result.content;
        this.albums.forEach((e:any) => {
          e.coverImageLink = this.root.getImageUrl(e.cover)
          e.images.forEach((f:any) => {
            f.imageLink = this.root.getImageUrl(f.image)
          })
        });
        setTimeout(() => {
          (<any>window).myCarousal();
        }, 500)
      }
    })
  }

  getAboutUs() {
    this.aboutUsService.getAboutUs().subscribe((data:any) => {
      if(data.result){
        this.aboutUs = data.result;
      }
    })
  }

}
