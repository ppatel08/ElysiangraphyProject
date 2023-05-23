import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  private readonly API_ENDPOINT = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  getAboutUs(): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/aboutus/details`);
  }

  insert(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/aboutus`, data);
  }

  update(_id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/aboutus/${_id}`, data)}

}
