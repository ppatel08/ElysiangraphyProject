import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/api/services/images.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/service/shared.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PaginationParams } from 'src/app/shared/pagination-params';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  _id: any = '';
  images: any = [];
  params: PaginationParams = {
    pageNo: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  resultsLength = 0;

  displayedColumns: string[] = ['id', 'albumName', 'image', 'albumCoverImage', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private imageService: ImagesService,
    private matDialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    public root: SharedService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.params.pageSize = this.paginator.pageSize;
    }
    this.setTable();
    this.getAllImages();
  }

  pageChange(pageEvent: PageEvent) {
    this.params.pageSize = pageEvent.pageSize;
    this.params.pageNo = pageEvent.pageIndex + 1;
    this.getAllImages();
  }

  sortChange(value: Sort) {
    this.params.sortBy = value.active;
    this.params.sortOrder = value.direction ? value.direction : null;
    this.getAllImages();
  }

  setTable(result: any = { content: [], count: 0 }) {
    this.resultsLength = result.count;
    this.dataSource = new MatTableDataSource(result.content);
  }

  getAllImages() {
    this.imageService.getAll().subscribe(data => {
      if (data.result) {
        this.images = data.result.content;
        this.setTable({ content: data.result.content, count: data.result.content.length });
      }
    })
  }

  edit(_id: any) {
    this.router.navigate([`/admin/dashboard/images/${_id}`]);
  }

  delete(_id: any) {
    this.matDialog.open(ConfirmationComponent, {
      data: { title: 'Delete Image ', message: 'Do you really want to delete this image ?' }
    }).afterClosed().subscribe((result) => {
      if (result === true) {
        this.imageService.delete(_id).subscribe(() => {
          this.notificationService.success('Image has been deleted successfully');
          this.getAllImages();
        });
      }
    });
  }
}
