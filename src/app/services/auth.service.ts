// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{access: string}>(
      `${this.API_URL}/login/`,
      { username, password }
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
      })
    );
  }


  isLoggedIn(): boolean {
    return !!this.getToken(); // Vérifie la présence du token
  }
  
  getToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}