import { Component,
  OnInit,
  Inject
  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ifile-viewer',
  templateUrl: './ifile-viewer.component.html',
  styleUrls: ['./ifile-viewer.component.css']
})
export class IFileViewerComponent implements OnInit {

  
  file:any;
  constructor(public dialogRef: MatDialogRef<IFileViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.file = data || {};
  }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
