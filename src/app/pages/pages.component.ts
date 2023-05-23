import { Component, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-pages',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div >
 <app-layout></app-layout>
</div>
  `,
})
export class PagesComponent {


  constructor(private sharedService: SharedService) { }

  ngOnInit () {
    this.sharedService.init();
  }

  ngOnDestroy () {
  }

}
