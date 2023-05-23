import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiModule } from '../api.module';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private readonly API_ENDPOINT = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  getAlbums(query: any): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums`, {
      params: query
    });
  }

  getAllAlbums(): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums`)
  }

  getCarousal(): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums/carousal/images`)
  }

  getAlbumById(_id: string): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums/${_id}`);
  }

  insert(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums`, data);
  }

  update(_id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums/${_id}`, data);
  }

  updateStatus(_id: string, status: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums/${_id}/status/${status}`, {});
  }

  updateSlideshowStatus(_id: string, status: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums/${_id}/slideshow/${status}`, {});
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_ENDPOINT}/elysiangraphy/api/v1/albums/${_id}`);
  }
}

