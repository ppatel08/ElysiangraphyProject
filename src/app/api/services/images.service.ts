import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private readonly API_ENDPOINT = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  getImages(query: any): Observable<any> {
    if(!query) {
      query = {};
    }
    if(!query.pageSize) {
      query.pageSize=1000;
    }
    if(!query.pageNo) {
      query.pageNo=1;
    }
    
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images`, {
      params: query
    });
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images`)
  }

  getImagesById(_id: any): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images/${_id}`)
  }

  insert(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images`, data);
  }

  update(_id: string, data: any): Observable<any> {
    return this.httpClient.delete(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images/${_id}`, data);
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images/${_id}`);
  }

  upload(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/images/upload`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  private errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
