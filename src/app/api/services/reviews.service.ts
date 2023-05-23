import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private readonly API_ENDPOINT = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  getReviews(): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews`);
  }

  getActiveReviews(query: any): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews`, {
      params: query
    });
  }

  getReview(_id: string): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews/${_id}`);
  }

  insert(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews`, data);
  }

  update(_id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews/${_id}`, data);
  }

  updateStatus(_id: string, status: any): Observable<any> {
    return this.httpClient.put(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews/${_id}/status/${status}`, {});
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews/${_id}`);
  }

  sendFeedbackLink(data: any): Observable<any> {
    return this.httpClient.post(`${this.API_ENDPOINT}/elysiangraphy/api/v1/reviews/feedback-link/send`, data)
  }
}
