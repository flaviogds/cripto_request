import { createAction, props } from '@ngrx/store';

export const loadListOfCoins =  createAction(
    '[Home] Load List of Coins',
    props<{ param: any}>()
);

export const loadListOfCoinsConcluded = createAction(
    '[Coin Service] Requisition Concluded',
    props<{ response: any }>()
);

export const loadCoinByIdOrName = createAction(
    '[Home] Load Coin by Id',
    props<{ param: any }>()
);

export const loadQuoteById = createAction(
    '[Home] Load Quote by Id',
    props<{ id: string }>()
);

export const loadCoinAndQuoteByIdOrNameConcluded = createAction(
    '[Coin Service] Requisition By Id Or Name Concluded',
    props<{ details: any }>()
);

export const loadLocales = createAction(
    '[Home] Load Locales',
);

export const loadLocalesConcluded = createAction(
    '[Home] Load Locales Concluded',
    props<{ locales: any }>()
);

export const changeCurrency = createAction(
    '[Home] Change Currency',
    props<{ id: string }>()
);

export const changeCurrencyConcluded = createAction(
    '[Home] Change Currency',
    props<{ currency: any }>()
);

export const changeRangeOfCoins = createAction(
    '[Home] Load Number of Coins to View',
    props<{ range: string }>()
);

export const loadFailed = createAction(
    'Requisition Failed',
    props<{ status: boolean, response: any }>()
);

export const clearState = createAction(
    '[Home] Clear State'
);
