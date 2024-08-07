import { Injectable } from '@angular/core';
import { ChatEvent } from '@common/enums';
import { SocketService } from '@common/interfaces';
import { io, Socket } from 'socket.io-client';
import { ENV } from '../env/env.dev';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, MessageGroup } from '@common/models';
import { GetGroupDto } from '@common/DTO/get-group.dto';

@Injectable()
export class GroupService implements SocketService<ChatEvent> {
  private readonly socket: Socket;
  private readonly URL = ENV.GROUP;
  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) {
    this.socket = io(this.URL, {
      extraHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
  connect(): void {
    this.socket.connect();
  }
  disconnect(): void {
    this.socket.disconnect();
  }
  leaveGroup(id: number) {
    this.socket.off(`group:${id}:message`);
  }
  emit(eventName: ChatEvent, data: any): void {
    this.socket.emit(eventName, data);
  }
  on<T>(eventName: ChatEvent | string): Observable<T> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: T) => {
        subscriber.next(data);
      });
    });
  }
  getMessages(groupID: number) {
    return this.http.get<HttpResponse<MessageGroup[]>>(
      `${ENV.HOST}/groups/message/${groupID}`
    );
  }
  getAllGroups() {
    return this.http.get<HttpResponse<GetGroupDto[]>>(`${ENV.HOST}/groups`);
  }
  getOne(id: number) {
    return this.http.get<HttpResponse<GetGroupDto>>(`${ENV.HOST}/groups/${id}`);
  }
  create(name: string, users: string[]) {
    return this.http.post<HttpResponse<any>>(`${ENV.HOST}/groups`, {
      name,
      users,
    });
  }
}
