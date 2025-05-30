import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient,
              private router: Router) {}

  getUserProfile(): Observable<any> {
  const token = localStorage.getItem('access_token');
  return this.http.get(`${this.baseUrl}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login/`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
          // Appel à /me/ pour récupérer le username
      this.getUserProfile().subscribe((user) => {
        localStorage.setItem('username', user.message); // ou user.username si tu modifies l'API
      });
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUsername(): string | null {
  return localStorage.getItem('username');
}
}
