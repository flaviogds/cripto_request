/* definir actions
1 - carrega a lista de coins com os parametros start, limit e convert **strings**
2 - carrega individualmente coin baseado no id passado **string**
3 - carrega as informações de cotação baseados no id da coin **string**

actions auxiliares opcionais
4 - indica que a requeisição esta sendo processada
5 - indica que a requisição falhou
*/

import { createEffect, ofType } from '@ngrx/effects';
import { Action, createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

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


/* definir reducers
1 - reducer global (for root)
2 - reducer local (for feature)
3 - alimenta o estado da store
*/

export interface StateModel{
    response: any;
    loading: boolean;
    failed: boolean;
}

export const initialState: StateModel = {
    response: undefined,
    loading: false,
    failed: false,
};

const reducer = createReducer(
    initialState,
    on(clearState, () => ({...initialState})),

    on(
        loadListOfCoins,
        loadCoinById,
        loadQuoteById,
        state => ({...state, loading: true})
    ),

    on(
        requisitionConcluded,
        (state, response) => ({...state, response, loading: false})
    ),

    on(
        requisitionFailed,
        state => ({...state, loading: false, failed: true})
    )
);

export function reducers(state: StateModel, action: Action): any{
    return reducer(state, action);
}


/* criar seletores
    atualizar e retornar partes diferentes da store

1 - seletor para a chamada da requisição
2 - seleter para o sucesso da chamada
3 - seletor par a falha da chamada
*/

export const featureKey = 'home';

export const featureReducer = createFeatureSelector<any>(featureKey);


export const selectResponse = createSelector(
    featureReducer,
    (state: StateModel) => state.response,
);

export const selectSuccess = createSelector(
    featureReducer,
    (state: StateModel) => state.loading
);

export const selectFailed = createSelector(
    featureReducer,
    (state: StateModel) => state.failed
);



/* criar effects
    criar observables para as actions e atribuir side effects a elas

1 - side effect par acarregar a lista de coins
2 - side effect para carrevar os detalhes da coin
3 - side effect para carregdar a cotação da coin
*/

export class CoinEffects{}