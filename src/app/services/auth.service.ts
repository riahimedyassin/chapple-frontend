import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../env/env.dev';
import { HttpResponse } from '@common/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = ENV.HOST;
  private connectedUser: any;
  constructor(private readonly http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post<HttpResponse<string>>(`${this.URL}/users/login`, {
      email,
      password,
    });
  }
  register(payload: { email: string; password: string; username: string }) {
    return this.http.post<void>(`${this.URL}/users/register`, payload);
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
  getCurrent() {
    return this.http.get<HttpResponse<any>>(`${this.URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
  setCurrentUser(data: any) {
    this.connectedUser = data;
  }
  clearCurrentUser() {
    this.connectedUser = null;
  }
  logout() {
    this.clearCurrentUser();
    this.clearToken();
  }
}
