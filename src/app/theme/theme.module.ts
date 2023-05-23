import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header/header.component';
import { FooterLongComponent } from './footer-long/footer-long.component';
import { PortfolioLayoutComponent } from './portfolio-layout/portfolio-layout.component';
const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  FooterLongComponent,
  PortfolioLayoutComponent
];
@NgModule({
  imports: [
    ...BASE_MODULES,
    MatTooltipModule
  ],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [
    ...COMPONENTS,
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return <ModuleWithProviders<ThemeModule>>{
      ngModule: ThemeModule,
      providers: [],
    };
  }
}
