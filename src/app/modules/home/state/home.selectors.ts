import { createFeatureSelector, createSelector } from '@ngrx/store';

export const homeSelector = createFeatureSelector('home');

export const getToken = createSelector(homeSelector, (state: any) => {
  return state.user.token;
});

