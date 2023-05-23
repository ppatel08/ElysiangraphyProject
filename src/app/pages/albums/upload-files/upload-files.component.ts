import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ImagesService } from 'src/app/api/services/images.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  @Input()
  albumId: any;

  @Output() 
  onComplete = new EventEmitter<any>();

  isUploaded:boolean = false;
  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      var formData: any = new FormData();
      formData.append("data", JSON.stringify({albumId : this.albumId}));
      formData.append("image", file);
      this.imageService.upload(formData).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            if(this.message.length == this.selectedFiles?.length) {
              this.onComplete.emit({status: 'completed'});
              this.isUploaded = true;
            }
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          if(this.message.length == this.selectedFiles?.length) {
            this.onComplete.emit({status: 'completed'});
            this.isUploaded = true;
          }
        }
      });
    }
  }

}
