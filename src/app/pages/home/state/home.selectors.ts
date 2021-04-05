import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector<any>('home');

export const selectSuccess = createSelector(
    selectHomeState,
  (homeState: HomeState) => homeState.entity
);

export const selectLoading = createSelector(
    selectHomeState,
  (homeState: HomeState) => homeState.loading
);

export const selectError = createSelector(
    selectHomeState,
  (homeState: HomeState) => homeState.error
);
