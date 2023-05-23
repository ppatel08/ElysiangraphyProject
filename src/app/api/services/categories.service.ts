import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly API_ENDPOINT = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  getCategory(query: any): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category`, {
      params: query
    });
  }

  getAllCategory(): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category`);
  }

  getCategoryById(_id: string): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category/${_id}`);
  }

  insert(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category`, data);
  }

  update(_id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category/${_id}`, data);
  }

  updateStatus(_id: string, status: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category/${_id}/status/${status}`, {});
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_ENDPOINT}/elysiangraphy/api/v1/category/${_id}`);
  }

  // uploadFile(file: File, type: any): Observable<any> {
  //   return this.httpClient.post(`${this.API_ENDPOINT}//elysiangraphy/api/v1/category`,file, type);
  // }
}
