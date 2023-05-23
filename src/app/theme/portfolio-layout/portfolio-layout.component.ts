import { Component, OnInit, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AboutusService } from 'src/app/api/services/aboutus.service';

@Component({
  selector: 'app-portfolio-layout',
  templateUrl: './portfolio-layout.component.html',
  styleUrls: ['./portfolio-layout.component.css']
})
export class PortfolioLayoutComponent implements OnInit {

  aboutUs: any;

  constructor(private aboutUsService: AboutusService,
    public router: Router) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  getAboutUs() {
    this.aboutUsService.getAboutUs().subscribe((data:any) => {
      if(data.result){
        this.aboutUs = data.result;
      }
    })
  }


}
