import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/delivery';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    const token = this.getCookie('token');  // Get token from cookie
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  createOrder(orderData: any): Observable<any> {
    const token = this.getCookie('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.apiUrl}/create`, orderData, { headers });
  }

  assignOrder(assignmentData: any): Observable<any> {
    const token = this.getCookie('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/assign`, assignmentData, { headers });
  }

  getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

}
