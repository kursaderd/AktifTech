// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environment';
import { UserLoginModel } from '../models/user-login-model';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:5160/Api/Auth'

  constructor(private http: HttpClient) {}

  register(user: UserLoginModel): Observable<any> {
    debugger;
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: UserLoginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.id; 
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
