import { Injectable } from '@angular/core';
import { ChatEvent } from '@common/enums';
import { SocketService } from '@common/interfaces';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ENV } from '../env/env.dev';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements SocketService<ChatEvent> {
  private readonly socket: Socket;
  private readonly URL = ENV.CHAT;
  constructor(private readonly authService: AuthService) {
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
}
