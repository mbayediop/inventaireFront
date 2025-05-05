import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../models/supplier.model';

@Injectable({
    providedIn: 'root'
  })

  export class  FournisseursService {

    private apiUrl = 'http://localhost:8000/api/fournisseurs/';

    constructor(private http: HttpClient) { }

    getFournisseurs(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.apiUrl);
      }


  }