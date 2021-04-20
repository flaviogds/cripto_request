import { createAction, props } from '@ngrx/store';

export const loadListOfCoinsDefault =  createAction(
    '[Home] Load List of Coins Default',
);

export const loadListOfCoins =  createAction(
    '[Home] Load List of Coins',
    props<{start: string, limit: string, convert: string}>()
);

export const loadCoinById = createAction(
    '[Home] Load Coin by Id',
    props<{id: string}>()
);

export const loadCoinByName = createAction(
    '[Home] Load Coin by Name',
    props<{name: string}>()
);

export const loadQuoteById = createAction(
    '[Home] Load Quote by Id',
    props<{id: string}>()
);

export const loadListOfCoinsConcluded = createAction(
    '[Coin Service] Requisition Concluded',
    props<{response: any}>()
);

export const loadCoinByIdOrNameConcluded = createAction(
    '[Coin Service] Requisition By Id Or Name Concluded',
    props<{details: any}>()
);

export const loadLocales = createAction(
    '[Home] Load Locales',
);

export const loadLocalesConcluded = createAction(
    '[Home] Load Locales Concluded',
    props<{locales: any}>()
);

export const changeCurrency = createAction(
    '[Home] Change Currency',
    props<{id: string}>()
);

export const changeCurrencyConcluded = createAction(
    '[Home] Change Currency',
    props<{currency: any}>()
);

export const loadFailed = createAction(
    'Requisition Failed',
    props<{response: any}>()
);

export const clearState = createAction(
    '[Home] Clear State'
);
