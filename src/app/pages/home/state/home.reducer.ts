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
};

const reducer = createReducer(
    initialState,
    on(homeAction.clearState, () => ({...initialState})),
    on(
        homeAction.loadListOfCoins,
        homeAction.loadListOfCoinsDefault,
        homeAction.loadLocales,
        homeAction.changeCurrency,
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
        homeAction.loadCoinByIdOrNameConcluded,
        (state, { details }) => ({
            ...state,
            details,
            loading: false
        })
    ),
    on(
        homeAction.loadLocalesConcluded,
        (state, locales) => ({
            ...state,
            locales,
            loading: false
        })
    ),
    on(
        homeAction.changeCurrencyConcluded,
        (state, currency) => ({
            ...state,
            ...currency,
            loading: false
        })
    ),
    on(
        homeAction.loadFailed,
        (state, response) => ({
            ...state,
            loading: false,
            failed: {
                status: true,
                response
            }
        })
    ),
);

export function reducers(state: StateModel | undefined, action: Action): StateModel{
    return reducer(state, action);
}
