import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/api/services/categories.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/service/shared.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PaginationParams } from 'src/app/shared/pagination-params';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  _id: any = '';
  reviews: any = [];
  params: PaginationParams = {
    pageNo: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };
  resultsLength = 0;

  displayedColumns: string[] = ['id', 'name', 'thumbnail', 'coverImage', 'isActive', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private categoriesService: CategoriesService,
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
    this.getCategories();
  }

  pageChange(pageEvent: PageEvent) {
    this.params.pageSize = pageEvent.pageSize;
    this.params.pageNo = pageEvent.pageIndex + 1;
    this.getCategories();
  }

  sortChange(value: Sort) {
    this.params.sortBy = value.active;
    this.params.sortOrder = value.direction ? value.direction : null;
    this.getCategories();
  }

  setTable(result: any = { content: [], count: 0 }) {
    this.resultsLength = result.count;
    this.dataSource = new MatTableDataSource(result.content);
  }


  getCategories() {
    this.categoriesService.getAllCategory().subscribe(data => {
      if (data.result) {
        this.reviews = data.result.content;
        this.setTable({ content: data.result.content, count: data.result.content.length });
      }
    })
  }

  changeStatus(element: any, event: any) {
    const status = event.checked ? 'Active' : 'Inactive';
    this.matDialog.open(ConfirmationComponent, {
      data: {
        message: `Are you sure you want to ${status} this category?`
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        this.categoriesService.updateStatus(element._id, status == 'Active' ? true : false).subscribe((res) => {
          this.getCategories()
        }, ((err) => {
          element.isActive = !element.isActive;
        })
        )
      } else {
        element.isActive = !element.isActive;
      }
    });
  }

  edit(_id: any) {
    this.router.navigate([`/admin/dashboard/category/${_id}`]);
  }

  delete(_id: any) {
    this.matDialog.open(ConfirmationComponent, {
      data: { title: 'Delete Category', message: 'Do you really want to delete this category ?' }
    }).afterClosed().subscribe((result) => {
      if (result === true) {
        this.categoriesService.delete(_id).subscribe(() => {
          this.notificationService.success('Category has been deleted successfully');
          this.getCategories();
        });
      }
    });
  }
}
