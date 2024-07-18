import { Observable } from 'rxjs';

/**
 * @interface
 * @description R should be the enum of the events available for the socket gatweay.
 */
export interface SocketService<R extends string> {
  /**
   * @description Connect to the websocket gateway
   */
  connect(): void;
  /**
   * @description Disconnect from the websocket gateway
   */
  disconnect(): void;
  /**
   * @description Emit an event to the websocket gateway
   */
  emit(eventName: R, data: any): void;
  /**
   * @description Triggered when an event is emitted by the server.
   */
  on<T>(eventName: R): Observable<T>;
}
