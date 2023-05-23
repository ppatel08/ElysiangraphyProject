import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  private readonly API_ENDPOINT = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  getContactus(data:any): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/contactus`, {
      params: data
    });
  }

  getContactusById(_id: string): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/contactus/${_id}`);
  }

  insert(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/contactus`, data);
  }

  updateStatus(_id: string, status: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/contactus/${_id}/status/${status}`, {});
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_ENDPOINT}/elysiangraphy/api/v1/contactus/${_id}`);
  }
}
