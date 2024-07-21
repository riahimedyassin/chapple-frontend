import { Injectable } from '@angular/core';
import { ENV } from '../env/env.dev';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@common/models';
import { Friend } from '@common/models';

@Injectable()
export class FriendService {
  private readonly URL = `${ENV.HOST}/friends`;
  constructor(private readonly http: HttpClient) {}
  getAll() {
    return this.http.get<HttpResponse<Friend[]>>(this.URL);
  }
}
