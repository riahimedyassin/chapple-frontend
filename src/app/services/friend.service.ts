import { Injectable } from '@angular/core';
import { ENV } from '../env/env.dev';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@common/models';
import { GetFriendDto } from '@common/DTO';

@Injectable()
export class FriendService {
  private readonly URL = `${ENV.HOST}/friends`;
  constructor(private readonly http: HttpClient) {}
  getAll() {
    return this.http.get<HttpResponse<GetFriendDto[]>>(this.URL);
  }
  add(email: string) {
    return this.http.post(this.URL, { sent_to: email });
  }
}
