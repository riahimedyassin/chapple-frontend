import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../env/env.dev';
import { HttpResponse } from '@common/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = ENV.HOST;
  constructor(private readonly http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post<HttpResponse<string>>(`${this.URL}/users/login`, {
      email,
      password,
    });
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  clearToken() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
