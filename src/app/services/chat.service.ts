import { Injectable } from '@angular/core';
import { ChatEvent } from '@common/enums';
import { SocketService } from '@common/interfaces';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ENV } from '../env/env.dev';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@common/models';
import { GetMessageDto } from '@common/DTO/get-message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements SocketService<ChatEvent> {
  private readonly socket: Socket;
  private readonly URL = ENV.CHAT;
  private readonly MESSAGE_URL = `${ENV.HOST}/messages`;
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
  connect() {
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }
  emit(eventName: ChatEvent, data: any) {
    this.socket.emit(eventName, data);
  }
  on<T>(eventName: ChatEvent): Observable<T> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: T) => {
        subscriber.next(data);
      });
    });
  }
  getMessages(username: string, page: number) {
    return this.http.get<HttpResponse<GetMessageDto[]>>(
      `${this.MESSAGE_URL}/${username}/${page}`
    );
  }
}
