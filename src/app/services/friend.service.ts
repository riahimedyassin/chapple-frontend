import { Injectable } from '@angular/core';
import { ENV } from '../env/env.dev';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@common/models';
import { GetFriendDto, GetFriendRequestDto } from '@common/DTO';

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
  getAllRequests() {
    return this.http.get<HttpResponse<GetFriendRequestDto[]>>(
      `${this.URL}/requests`
    );
  }
  getAllRequestsCount() {
    return this.http.get<HttpResponse<number>>(`${this.URL}/requests/count`);
  }
  respond(id: number, response: boolean) {
    return this.http.patch<void>(`${this.URL}/respond/${id}`, {
      accepted: response,
    });
  }
}
