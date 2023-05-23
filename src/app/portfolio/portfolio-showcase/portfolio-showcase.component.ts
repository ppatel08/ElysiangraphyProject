import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/api/services/categories.service';
import { ImagesService } from 'src/app/api/services/images.service';
import { SharedService } from 'src/app/service/shared.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-showcase.component.html',
  styleUrls: ['./portfolio-showcase.component.css']
})
export class PortfolioShowcaseComponent implements OnInit {

  cateGories: any;

  API_ENDPOINT = environment.apiEndpoint;

  constructor(private categoryService: CategoriesService,
    private imageService: ImagesService,
    public root: SharedService) { }

  ngOnInit(): void {
    this.getCategories()
   
  }

  getCategories() {
    this.categoryService.getCategory({ sortBy: 'createdAt', sortOrder: 'desc' }).subscribe(data => {
      if(data.result){
        this.cateGories = data.result.content
        this.cateGories.forEach((e:any) => {
          e.imageUrl = this.root.getImageUrl(e.thumbnail)
        });
        setTimeout(() => {
          (<any>window).myCarousal();
          (<any>window).pageLayout();
          (<any>window).myLightGallery();
          (<any>window).myThemeJs()
        }, 100)
      }
    })
  }

}
