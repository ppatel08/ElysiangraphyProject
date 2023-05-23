import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
  }


  ngOnInit() {
  }

  onNoClick(action:any): void {
    this.dialogRef.close(action);
  }

}
