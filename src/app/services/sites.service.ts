import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../../models/site.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class SitesService {
    private baseUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getSites(): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.baseUrl}/equipements/sites/`);
      }
  }