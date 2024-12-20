import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@services/auth.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SetErrorMessage } from 'src/app/state/global.actions';
import { SetConnectedUser, SetFriends, StartLogin } from './home.actions';
import { Router } from '@angular/router';
import { FriendService } from '@services/friend.service';
import { getToken } from './home.selectors';
import { Store } from '@ngrx/store';
import { GetToken } from '@modules/chat/state/chat.selectors';

@Injectable()
export class HomeEffects {
  constructor(
    private readonly authService: AuthService,
    private readonly action$: Actions,
    private readonly router: Router,
    private readonly friendService: FriendService,
    private readonly store: Store
  ) {}

  startLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StartLogin),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((value) => {
            return SetConnectedUser({
              token: value.data,
              username: action.username,
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(
              SetErrorMessage({ message: 'Invalid email or password' })
            );
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(SetConnectedUser),
        exhaustMap((_) => {
          return this.router.navigateByUrl('/chat/welcome');
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
