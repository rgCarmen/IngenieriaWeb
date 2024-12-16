import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private baseUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(usuarioId: String): Observable<any> {
    return this.http.get(`${this.baseUrl}?usuarioId=${usuarioId}`);
  }
}
