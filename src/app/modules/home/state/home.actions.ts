import { GetFriendDto } from '@common/DTO';
import { createAction, props } from '@ngrx/store';

export const SetConnectedUser = createAction(
  '[Home State] Set connected user',
  props<{ token: string; username: string }>()
);

export const StartLogin = createAction(
  '[Home State] Login start',
  props<{ username: string; password: string }>()
);

export const SetFriends = createAction(
  '[Home State] Load friend list',
  props<{ list: GetFriendDto[] }>()
);
