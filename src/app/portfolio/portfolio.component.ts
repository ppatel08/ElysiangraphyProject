import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pages',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div >
  <app-portfolio-layout></app-portfolio-layout>
</div>
  `,
})
export class PortfolioComponent {


  constructor() { }

  ngOnInit () {
  }

  ngOnDestroy () {
  }

}
