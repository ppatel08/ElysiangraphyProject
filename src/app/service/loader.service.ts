import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private static calls = 0;

  constructor(private spinner: NgxSpinnerService) { }

  show(): void {
    LoaderService.calls++;
    this.spinner.show();
  }

  hide(): void {
    LoaderService.calls--;
    if (LoaderService.calls <= 0) {
      this.spinner.hide();
    }
  }
}
