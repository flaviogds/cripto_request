import { Action, createReducer, on } from '@ngrx/store';
import * as homeAction from './home.actions';

export interface HomeState {
    entity: any;
    loading: boolean;
    error: boolean;
}

export const initialState: HomeState = {
    entity: undefined,
    loading: true,
    error: false
};

const reducer = createReducer(
    initialState,
    on(homeAction.clearHomeState, () => initialState),

    on( homeAction.loadCoins,
        homeAction.loadCoinById,
        homeAction.loadQuoteCoin,
        state => ({ ...state, loading: true, error: false })),

    on( homeAction.loadRequestSuccess,
        (state, { entity }) => ({...state, entity, loading: false })),

    on( homeAction.loadRequestFailed,
        state => ({...state, loading: false, error: true })),
);

export function homeReducer(
    state: HomeState | undefined,
    action: Action): HomeState {

    return reducer(state, action);
}
