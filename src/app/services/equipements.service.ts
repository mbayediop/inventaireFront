import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../../models/equipement.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {
  private apiUrl = 'http://localhost:8000/api/equipements/equipements/';
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.baseUrl}/equipements/equipements/`);
  }

  getById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.baseUrl}/equipements/equipements/${id}/`);
  }

  create(formData: FormData): Observable<Equipement> {
    // Ne pas définir de Content-Type, le navigateur le fera automatiquement avec boundary pour FormData
    return this.http.post<Equipement>(`${this.baseUrl}/equipements/equipements/`, formData);
  }

  // Version pour les données JSON si nécessaire
  createJson(equipement: any): Observable<Equipement> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Equipement>(`${this.baseUrl}/equipements/equipements/`, equipement, { headers });
  }

  update(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.baseUrl}/equipements/equipements/${id}/`, equipement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/equipements/equipements/${id}/`);
  }
}