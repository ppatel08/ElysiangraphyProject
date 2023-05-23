import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/api/services/album.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/service/shared.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PaginationParams } from 'src/app/shared/pagination-params';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  _id: any = '';
  aboutusData: any = [];

  params: PaginationParams = {
    pageNo: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  resultsLength = 0;

  displayedColumns: string[] = ['id', 'title', 'isActive', 'isSelected', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    public root: SharedService,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.params.pageSize = this.paginator.pageSize;
    }
    this.setTable();
    this.getAllAlbums();
  }

  pageChange(pageEvent: PageEvent) {
    this.params.pageSize = pageEvent.pageSize;
    this.params.pageNo = pageEvent.pageIndex + 1;
    this.getAllAlbums();
  }

  sortChange(value: Sort) {
    this.params.sortBy = value.active;
    this.params.sortOrder = value.direction ? value.direction : null;
    this.getAllAlbums();
  }

  setTable(result: any = { content: [], count: 0 }) {
    this.resultsLength = result.count;
    this.dataSource = new MatTableDataSource(result.content);
  }

  getAllAlbums() {
    this.albumService.getAllAlbums().subscribe(data => {
      if (data.result) {
        this.aboutusData = data.result.content;
        this.setTable({ content: data.result.content, count: data.result.content.length });
      }
    });
  }

  edit(_id: any) {
    this.router.navigate([`/admin/dashboard/albums/${_id}/view`]);
  }

  changeStatus(element: any, event: any) {
    const status = event.checked ? 'Active' : 'Inactive';
    this.matDialog.open(ConfirmationComponent, {
      data: {
        message: `Are you sure you want to ${status} this album?`
      }
    }).afterClosed().subscribe((data: any) => {
      if (data) {
        this.albumService.updateStatus(element._id, status == 'Active' ? true : false).subscribe((res) => {
          this.getAllAlbums()
        }, ((err) => {
          element.isActive = !element.isActive;
        })
        )
      } else {
        element.isActive = !element.isActive;
      }
    });
  }
  changeSlideShowStatus(element: any, event: any) {
    const status = event.checked ? 'Active' : 'Inactive';
    this.matDialog.open(ConfirmationComponent, {
      data: {
        message: `Are you sure you want to ${status} this album?`
      }
    }).afterClosed().subscribe((data: any) => {
      if (data) {
        this.albumService.updateSlideshowStatus(element._id, status == 'Active' ? true : false).subscribe((res) => {
          this.getAllAlbums()
        }, ((err) => {
          element.isSelected = !element.isSelected;
        })
        )
      } else {
        element.isSelected = !element.isSelected;
      }
    });
  }

  delete(_id:any) {
    this.matDialog.open(ConfirmationComponent, {
      data: { title: 'Delete Album ', message: 'Do you really want to delete this Album ?' }
    }).afterClosed().subscribe((result:any) => {
      if (result === true) {
        this.albumService.delete(_id).subscribe(() => {
          this.notificationService.success('Album has been deleted successfully');
          this.getAllAlbums();
        });
      }
    });
  }
}
