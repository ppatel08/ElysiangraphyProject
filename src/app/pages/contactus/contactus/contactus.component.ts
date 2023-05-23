import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ContactusService } from 'src/app/api/services/contactus.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PaginationParams } from 'src/app/shared/pagination-params';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})

export class ContactusComponent implements OnInit {

  _id: any = '';
  contacts: any = [];
  params: PaginationParams = {
    pageNo: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };
  resultsLength = 0;

  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'status', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private contactusService: ContactusService,
    private matDialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService, 
  ) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.params.pageSize = this.paginator.pageSize;
    }
    this.setTable();
    this.getContactus();
  }

  pageChange(pageEvent: PageEvent) {
    this.params.pageSize = pageEvent.pageSize;
    this.params.pageNo = pageEvent.pageIndex + 1;
    this.getContactus();
  }

  sortChange(value: Sort) {
    this.params.sortBy = value.active;
    this.params.sortOrder = value.direction ? value.direction : null;
    this.getContactus();
  }

  setTable(result: any = { content: [], count: 0 }) {
    this.resultsLength = result.count;
    this.dataSource = new MatTableDataSource(result.content);
  }


  getContactus() {
    this.contactusService.getContactus(this.params).subscribe(data => {
      if (data.result) {
        this.contacts = data.result.content;
        this.setTable({ content: data.result.content, count: data.result.content.length });
      }
    });
  }
  
  edit(_id: any) {
    this.router.navigate([`/admin/dashboard/contactus/${_id}/view`]);
  }

  delete(_id: any) {
    this.matDialog.open(ConfirmationComponent, {
      data: { title: 'Inquiry', message: 'Do you really want to delete this Inquiry ?' }
    }).afterClosed().subscribe((result) => {
      if (result === true) {
        this.contactusService.delete(_id).subscribe(() => {
          this.notificationService.success('Inquiry has been deleted successfully');
          this.getContactus();
        });
      }
    });
  }

}
