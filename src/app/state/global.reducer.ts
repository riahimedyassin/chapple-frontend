import { createReducer, on } from '@ngrx/store';
import { GlobalStateInit } from './global.state';
import { SetErrorMessage } from './global.actions';

const _globalReducer = createReducer(
  GlobalStateInit,
  on(SetErrorMessage, (state, { message }) => {
    return {
      ...state,
      error: message,
    };
  })
);

export function GlobalStateReducer(state: any, action: any) {
  return _globalReducer(state, action);
}
