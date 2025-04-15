import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5090/api/Account';

  constructor(private http: HttpClient) {}

  registerBrand(data: any) {
    return this.http.post(`${this.baseUrl}/register/Brand`, data);
  }
}
