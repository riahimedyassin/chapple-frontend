import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatStateInterface, ChatStateName } from './chat.state';

export const ChatSelector =
  createFeatureSelector<ChatStateInterface>(ChatStateName);

export const GetToken = createSelector(ChatSelector, (state) => {
  return state.user.token;
});
