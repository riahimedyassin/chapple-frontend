import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetToken } from '@modules/chat/state/chat.selectors';
import { ChatStateInterface } from '@modules/chat/state/chat.state';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<ChatStateInterface>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(GetToken).pipe(
      take(1),
      exhaustMap((value) => {
        if (!value) return next.handle(request);
        const cloned = request.clone({
          setHeaders: {
            Authorization: `Bearer ${value}`,
          },
        });
        return next.handle(cloned);
      })
    );
  }
}
