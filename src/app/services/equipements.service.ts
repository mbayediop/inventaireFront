import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../../models/equipement.model';

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {

  private apiUrl = 'http://localhost:8000/api/equipements/';


  constructor(private http: HttpClient) { }

  getEquipements(): Observable<Equipement[]>{
    return this.http.get<Equipement[]>(this.apiUrl);
  }

  getById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.apiUrl}${id}/`);
  }
  create(equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(this.apiUrl, equipement);
  }

  update(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.apiUrl}${id}/`, equipement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
