import { createAction, props } from '@ngrx/store';

export const SetConnectedUser = createAction(
  '[Chat State] Set connected user',
  props<{ token: string; username: string }>()
);

export const StartLogin = createAction(
  '[Chat State] Login start',
  props<{ username: string; password: string }>()
);


