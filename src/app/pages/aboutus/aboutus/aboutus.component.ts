import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AboutusService } from 'src/app/api/services/aboutus.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/service/shared.service';
import { PaginationParams } from 'src/app/shared/pagination-params';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  _id: any = '';
  aboutusData: any = [];

  constructor(
    private aboutusService: AboutusService,
    private router: Router,
    public root: SharedService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getAboutusDetails();
  }

  getAboutusDetails() {
    this.aboutusService.getAboutUs().subscribe(data => {
      if (data.result) {
        this.aboutusData = data.result;
      }
    })
  }

  edit() {
    this.router.navigate([`/admin/dashboard/aboutus/${this.aboutusData._id}`]);
  }

}
