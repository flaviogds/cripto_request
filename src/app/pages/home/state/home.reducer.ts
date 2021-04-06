import { Action, createReducer, on } from '@ngrx/store';

import * as homeAction from '../state/home.actions';

export interface StateModel{
    response: any;
    loading: boolean;
    failed: boolean;
}

export const initialState: StateModel = {
    response:  {},
    loading: true,
    failed: false,
};

const reducer = createReducer(
    initialState,
    on(homeAction.clearState, state => ({...initialState})),

    on(
        homeAction.loadListOfCoins,
        homeAction.loadCoinById,
        homeAction.loadQuoteById,
        state => ({...state, loading: true})
    ),

    on(
        homeAction.requisitionConcluded,
        (state, { response }) => ({
            ...state,
            response,
            loading: false
        })
    ),

    on(
        homeAction.requisitionFailed,
        state => ({...state, loading: false, failed: true})
    )
);

export function reducers(state: StateModel | undefined, action: Action): StateModel{
    return reducer(state, action);
}
