import { createReducer, on } from '@ngrx/store';
import { SetConnectedUser } from './home.actions';

const initState = {
  user: {
    token: '',
    email: '',
  },
};

const _homeReducer = createReducer(
  initState,
  on(SetConnectedUser, (state, action) => {
    return {
      ...state,
      user: {
        token: action.token,
        email: action.username,
      },
    };
  })
);

export function HomeReducer(state: any, action: any) {
  return _homeReducer(state, action);
}
