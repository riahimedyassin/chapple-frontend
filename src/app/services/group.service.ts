import { Injectable } from '@angular/core';
import { ChatEvent } from '@common/enums';
import { SocketService } from '@common/interfaces';
import { io, Socket } from 'socket.io-client';
import { ENV } from '../env/env.dev';
import { Observable } from 'rxjs';

@Injectable()
export class GroupService implements SocketService<ChatEvent> {
  private readonly socket: Socket;
  private readonly URL = ENV.GROUP;
  constructor() {
    this.socket = io(this.URL);
  }
  connect(): void {
    this.socket.connect();
  }
  disconnect(): void {
    this.socket.disconnect();
  }
  emit(eventName: ChatEvent, data: any): void {
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
