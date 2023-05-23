import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from './notification.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private notificationService: NotificationService, private loaderService: LoaderService) { }

  handleLogout(message: any) {
    this.notificationService.error(message ? message : "Session expired");
    localStorage.removeItem('access_token');
    this.router.navigate(['/'])
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = localStorage.getItem('access_token');

    if ('-' === request.headers.get('Authorization')) {
      request = request.clone({ headers: request.headers.delete('Authorization') });
    } else if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }


    if ('-' === request.headers.get('Content-Type')) {
      request = request.clone({ headers: request.headers.delete('Content-Type') });
    } else if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    } else if(request.headers.get('Content-Type') === 'image/jpeg') {
      request = request.clone({ headers: request.headers.set('Content-Type', 'image/jpeg') });
    }

    if (!request.headers.has('Accept')) {
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }


    if (request.body instanceof FormData) {
      request = request.clone({ headers: request.headers.delete('Content-Type', 'application/json') });
      request = request.clone({ headers: request.headers.delete('Accept', 'application/json')});
    }

    if (!environment.production) {
      console.log('intercepting...', request);
    }

    this.loaderService.show();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (!environment.production) {
            console.log(`response`, event);
          }

          if (event.body && event.body.errorCode && (event.body.errorCode === 401 || event.body.errorCode === 403)) {
            this.handleLogout(event.body.message);
            throw { error: event.body, handled: true };
          }

          this.loaderService.hide();

        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(`error`, error);
        }

        if (!(error as any).handled) {
          const errorMessage = (error.error
            && (error.error.errorDescription
              || (error.error.errors && error.error.errors.map((f: any) => f.message).join(' ')))) || 'Something went wrong!!';
          if (error.status === 401 || error.status === 403) {
            console.log(error);
            const missingPermission = (error as any).error && (error as any).error.errors && (error as any).error.errors.find((e: any) => 103 === e.code);
            if (missingPermission) {
              this.notificationService.error(`Missing permission: ${(error as any).error.module}`);
            } else {
              this.handleLogout(errorMessage);
            }
          } else {
            this.notificationService.error(errorMessage);
          }
        }

        this.loaderService.hide();

        return throwError(error);
      }));
  }

}
