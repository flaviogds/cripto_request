import { createAction, props } from '@ngrx/store';

export const loadListOfCoins =  createAction(
'[Home] Load List of Coins',
props<{start: string, limit: string, convert: string}>()
);

export const loadCoinById = createAction(
'[Home] Load Coin by Id',
props<{id: string}>()
);

export const loadQuoteById = createAction(
'[Home] Load Quote by Id',
props<{id: string}>()
);

export const requisitionConcluded = createAction(
'[Coin Service] Requisition Concluded',
props<{response: any}>()
);

export const requisitionFailed = createAction(
'[Coin Service] Requisition Failed',
);

export const clearState = createAction(
'[Any] Clear State'
);
