import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private sharedService: SharedService,
    private notificationService: NotificationService) {
      sharedService.init();
  }
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('access_token'))
      return false;
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) return true;
    this.router.navigate(['/login'], {
      queryParams: {
        return: state.url
      }
    });
    return false;
  }

}
