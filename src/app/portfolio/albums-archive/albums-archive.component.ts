import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/api/services/album.service';
import { CategoriesService } from 'src/app/api/services/categories.service';
import { SharedService } from 'src/app/service/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-albums-archive',
  templateUrl: './albums-archive.component.html',
  styleUrls: ['./albums-archive.component.css']
})
export class AlbumsArchiveComponent implements OnInit {

  categoryId: any;
  albums: any;
  API_ENDPOINT = environment.apiEndpoint;
  category: any;

  constructor(private activeRoute: ActivatedRoute,
    private albumService: AlbumService,
    private categoriesService: CategoriesService,
    public root: SharedService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if(param.id){
        this.categoryId = param.id;
        this.getAlbums(this.categoryId)
        this.getCategory(this.categoryId)
      }
    });
    setTimeout(() => {
      (<any>window).myCarousal();
      (<any>window).pageLayout();
      (<any>window).myLightGallery();
      (<any>window).myThemeJs()
    }, 100)
  }

  getAlbums(id: any) {
    this.albumService.getAlbums({ categoryId: id }).subscribe(data => {
      if(data.result){
        this.albums = data.result.content
        this.albums.forEach((e:any) => {
          e.imageLink = this.root.getImageUrl(e.thumbnail)
        })
      }
    })
  }

  getCategory(id:any) {
    this.categoriesService.getCategoryById(id).subscribe((data:any) => {
      if(data.result){
        this.category = data.result;
        this.category.coverImageUrl = this.root.getImageUrl(this.category.coverImage)
      }
    })
  }

}

// categoryId
// :
// "63209ce2864c2a66968a0606"
// categoryName
// :
// "tez"
// createdAt
// :
// "2022-09-13T15:27:18.345Z"
// description
// :
// "first album"
// isActive
// :
// true
// thumbnail
// :
// "uploads/albums/album-java.png"
// title
// :
// "WorkOholic"
