import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';
import { PaginationParams } from 'src/app/shared/pagination-params';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataset } from 'chart.js';
import { DateServiceService } from 'src/app/service/date-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()
  type: string = 'all';
  files: any
  uploadfile: any
  
  @ViewChild('file')
  private file: ElementRef = {} as ElementRef;

  constructor(
    public root: SharedService, 
    private router: Router, 
    private dateService: DateServiceService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
