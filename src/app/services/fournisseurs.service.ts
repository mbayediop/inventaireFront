import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../models/supplier.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class  FournisseursService {
    private baseUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getFournisseurs(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(`${this.baseUrl}/fournisseurs/`);
      }


  }