import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-reason',
  templateUrl: './confirmation-reason.component.html',
  styleUrls: ['./confirmation-reason.component.css']
})
export class ConfirmationReasonComponent implements OnInit {

  comment:any;
  submitted = false;
  constructor(public dialogRef: MatDialogRef<ConfirmationReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
  }


  ngOnInit() {
  }

  onNoClick(action:any): void {
    if(action == 'Y') {
      this.submitted = true;
      if(!this.comment || this.comment.trim().length == 0 ) {
        return;
      }
      this.dialogRef.close({action:action, comment : this.comment});
    } else {
      this.dialogRef.close({action:action});
    }
    
  }
}
