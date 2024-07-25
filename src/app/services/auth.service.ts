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
    // console.log(this.connectedUser)
    // if (!this.connectedUser)
    return this.http.get<HttpResponse<any>>(`${this.URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    // const result = new Subject<any>();
    // result.next(new HttpResponse<any>('got it', 200, this.connectedUser));
    // result.complete();
    // return result.asObservable();
  }
  setCurrentUser(data: any) {
    this.connectedUser = data;
  }
  clearCurrentUser() {
    this.connectedUser = null;
  }
}
