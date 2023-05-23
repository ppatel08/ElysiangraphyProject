import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PermissionConstants as permissions } from '../util/Constants';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  permissions = permissions;

  breadcrumb = [{ title: 'Dashboard', route: './esdn/dashboard' }];
  breadcrumbChange: BehaviorSubject<any>;
  breadcrumbChangeObs: Observable<any>;


  activeMenu = 'home';
  activeMenuChange: BehaviorSubject<any>;
  activeMenuChangeObs: Observable<any>;

  loggedInUser: any;
  loggedInUserChange: BehaviorSubject<any>;

  userPermissions: string[] = [];
  role: string = 'SubAdmin';


  constructor() {


    this.activeMenuChange = new BehaviorSubject(null);
    this.activeMenuChangeObs = this.activeMenuChange.asObservable();

    this.breadcrumbChange = new BehaviorSubject(null);
    this.breadcrumbChangeObs = this.breadcrumbChange.asObservable();

    this.loggedInUserChange = new BehaviorSubject(null);

  }

  init() { }

  setLoggedInUserData(user: any) {
    this.loggedInUser = user;
    this.loggedInUserChange.next(user);
  }

  getImageUrl(image: string) {
    return `${environment.apiEndpoint}/elysiangraphy/api/v1/images/download/file/${encodeURIComponent(image)}` ;
  }
}
