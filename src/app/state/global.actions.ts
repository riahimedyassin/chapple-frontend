import { createAction, props } from '@ngrx/store';

export const SetErrorMessage = createAction(
  '[Global State] Set error message',
  props<{ message: string }>()
);
