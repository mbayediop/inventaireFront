import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../../models/equipement.model';

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {
  private apiUrl = 'http://localhost:8000/api/equipements/equipements/';

  constructor(private http: HttpClient) { }

  getEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.apiUrl);
  }

  getById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.apiUrl}${id}/`);
  }

  create(formData: FormData): Observable<Equipement> {
    // Ne pas définir de Content-Type, le navigateur le fera automatiquement avec boundary pour FormData
    return this.http.post<Equipement>(this.apiUrl, formData);
  }

  // Version pour les données JSON si nécessaire
  createJson(equipement: any): Observable<Equipement> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Equipement>(this.apiUrl, equipement, { headers });
  }

  update(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.apiUrl}${id}/`, equipement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}