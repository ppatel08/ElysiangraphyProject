import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../theme/theme.module';
import { ApiModule } from '../api/api.module';
import { MatTableModule } from '@angular/material/table';
import { NgxDatePickerModule } from '@ngx-tiny/date-picker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { OnlynumberDirective } from './directive/OnlynumberDirective';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {MatExpansionModule} from '@angular/material/expansion';

const BASE_MODULES = [
  ThemeModule,
  MatTableModule,
  NgxDatePickerModule,
  MatDialogModule,
  FormsModule,
  MatPaginatorModule,
  MatSortModule,
  LayoutModule,
  MatCardModule,
  MatPseudoCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatTabsModule,
  ColorPickerModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatExpansionModule,
];

const SHARED_MODULE_PROVIDERS: any = [
];

@NgModule({
  imports: [
    CommonModule,
    ...BASE_MODULES
  ],
  exports: [
    ApiModule,
    NgxDatePickerModule,
    FormsModule,
    OnlynumberDirective,
    ...BASE_MODULES
  ],
  declarations: [
    OnlynumberDirective,
    ChangePasswordComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return <ModuleWithProviders<SharedModule>>{
      ngModule: SharedModule,
      providers: [...SHARED_MODULE_PROVIDERS],
    };
  }
}
