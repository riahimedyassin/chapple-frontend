import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../env/env.dev';
import { HttpResponse } from '@common/models';

@Injectable()
export class UserService {
  private readonly URL = `${ENV.HOST}/users`;
  constructor(private readonly http: HttpClient) {}
  getEmail(username: string) {
    return this.http.get<HttpResponse<{email : string}>>(`${this.URL}/email/${username}`);
  }
}
