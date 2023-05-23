import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


const SERVICES = [
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: []
})
export class ApiModule {
  static forRoot(): ModuleWithProviders<ApiModule> {
    return <ModuleWithProviders<ApiModule>>{
      ngModule: ApiModule,
      providers: [],
    };
  }
}
