import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './api/api.module';
import { PagesModule } from './pages/pages.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ThemeModule } from './theme/theme.module';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { SharedService } from './service/shared.service';
import { LoaderService } from './service/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { IFileViewerComponent } from './shared/components/ifile-viewer/ifile-viewer.component';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { environment } from '../environments/environment';
import { ConfirmationReasonComponent } from './shared/components/confirmation-reason/confirmation-reason.component';
import { WarningComponent } from './shared/components/warning/warning.component';
import { AppInitService } from './api/services/app-init.service';
import { APP_INITIALIZER } from '@angular/core';


export function appProviderFactory(provider: AppInitService) {
  return () => provider.Init();
}
@NgModule({
  declarations: [
    AppComponent,
    IFileViewerComponent,
    ConfirmationComponent,
    ConfirmationReasonComponent,
    WarningComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    PagesModule,
    PortfolioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    SharedModule.forRoot(),
    ApiModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    { provide: APP_INITIALIZER, useFactory: appProviderFactory,deps: [AppInitService], multi: true },
    ApiModule,
    SharedService,
    LoaderService
  ],
  entryComponents: [
    IFileViewerComponent,
    ConfirmationComponent,
    ConfirmationReasonComponent,
    WarningComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
