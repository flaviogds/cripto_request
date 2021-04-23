import { Action, createReducer, on } from '@ngrx/store';

import * as homeAction from '../state/home.actions';

export interface StateModel{
    response: any;
    details: any;
    loading: boolean;
    failed: {
        status: boolean,
        response: any,
    };
    locales: any;
    currency: any;
    range: string;
}

export const initialState: StateModel = {
    response:  {},
    details: {},
    loading: false,
    failed: {
        status: false,
        response: {}
    },
    locales: [],
    currency: {
        id: '2781',
        name: 'Dollar',
        locale: 'United States',
        code: 'USD',
        symbol: '$'
    },
    range: '500',
};

const reducer = createReducer(
    initialState,
    on(homeAction.clearState, () => ({...initialState})),
    on(
        homeAction.loadListOfCoins,
        homeAction.loadLocales,
        state => ({...state, loading: true})
    ),
    on(
        homeAction.loadListOfCoinsConcluded,
        (state, { response }) => ({
            ...state,
            response,
            loading: false
        })
    ),
    on(
        homeAction.loadCoinAndQuoteByIdOrNameConcluded,
        (state, { details }) => ({
            ...state,
            details,
        })
    ),
    on(
        homeAction.loadLocalesConcluded,
        (state, locales) => ({
            ...state,
            ...locales,
            loading: false
        })
    ),
    on(
        homeAction.changeCurrencyConcluded,
        (state, currency) => ({
            ...state,
            ...currency,
        })
    ),
    on(
        homeAction.changeRangeOfCoins,
        (state, range) => ({
            ...state,
            ...range,
        })
    ),
    on(
        homeAction.loadFailed,
        (state, failed) => ({
            ...state,
            ...failed,
            loading: false,
        })
    ),
);

export function reducers(state: StateModel | undefined, action: Action): StateModel{
    return reducer(state, action);
}
