import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private userPayload: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    this.userPayload = this.decodeToken();
   }

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}/authentication/login`, user);
  }

  logout() {
    let key = this.getToken();
    if (key != null) {
      this.storageService.removeItem(key);
      this.router.navigate(['/login']);
    }
  }

  storeToken(tokenValue: string) {
    this.storageService.setItem('token', tokenValue);
  }
  getToken() {
    return this.storageService.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }
  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  getUserIdFromToken(): string | null {    
    if (this.userPayload && this.userPayload.sub) {
      return this.userPayload.sub;
    }
    return null;
  }
}
