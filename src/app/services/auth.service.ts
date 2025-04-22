import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../Models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  logout() {
    this.cookieService.delete('token', '/', 'localhost');
    this.userSubject.next(null);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
