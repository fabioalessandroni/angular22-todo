import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attivita } from '../models/attivita.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  getAttivita(limite = 5): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(`${this.baseUrl}?_limit=${limite}`);
  }

  creaAttivita(item: Omit<Attivita, 'id'>): Observable<Attivita> {
    return this.http.post<Attivita>(this.baseUrl, item);
  }

  eliminaAttivita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
