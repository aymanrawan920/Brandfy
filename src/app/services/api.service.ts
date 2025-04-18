import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7053/api'; 

  constructor(private http: HttpClient) {}

  registerBrand(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Account/register/brand`, data);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Category`);
  }
  createBrand(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
  
    console.log('🟢 TOKEN SENT:', token); // تأكد إنه طالع مش null
  
    return this.http.post(`${this.baseUrl}/brands`, data, {
      headers: {
        Authorization: `Bearer ${token}` // لازم يكون Bearer كده بالظبط
      }
    });
  }
  
}