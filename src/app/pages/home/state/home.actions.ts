import { createAction, props } from '@ngrx/store';

export const loadCoins = createAction(
    '[Home] Load Coin List',
    props<{start: string, limit: string, convert: string}>()
);

export const loadCoinById = createAction(
    '[Home] Load Coin By Id',
    props<{id: string}>()
);

export const loadQuoteCoin = createAction(
    '[Home] Load Quote Coin',
    props<{id: string}>()
);

export const loadRequestSuccess = createAction(
    '[Service Response] Load Request Success',
    props<{ entity: any }>(),
);

export const loadRequestFailed = createAction(
    '[Service Response] Load Request Failed',
);

export const clearHomeState = createAction(
    '[Home] Clear State'
);
