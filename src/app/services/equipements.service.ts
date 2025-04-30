import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {

  private apiUrl = 'http://localhost:8000/api/equipements/';


  constructor(private http: HttpClient) { }

  getEquipements(): Observable<any>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
