
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StateModel } from '../state/home.reducer';

export const featureKey = 'home';

export const selectFeature = createFeatureSelector<StateModel>(featureKey);


export const selectResponse = createSelector(
    selectFeature,
    (state: StateModel) => state.response,
);

export const selectLoading = createSelector(
    selectFeature,
    (state: StateModel) => state.loading,
);

export const selectFailed = createSelector(
    selectFeature,
    (state: StateModel) => state.failed,
);
