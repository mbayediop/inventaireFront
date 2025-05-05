import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../../models/site.model';

@Injectable({
    providedIn: 'root'
  })

  export class SitesService {

    private apiUrl = 'http://localhost:8000/api/equipements/sites/';

    constructor(private http: HttpClient) { }

    getSites(): Observable<Site[]> {
        return this.http.get<Site[]>(this.apiUrl);
      }


  }