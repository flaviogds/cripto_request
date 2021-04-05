import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ServiceCoin } from '../../../services/coins.service';

import * as homeActions from './home.actions';
import { Coin, CoinList } from 'src/app/entity/entity';

@Injectable()
export class HomeEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private coinService: ServiceCoin) { }

    loadCoins$ = createEffect(() => this.actions$
        .pipe(
            ofType(homeActions.loadCoins),
            mergeMap(({ start, limit, convert }) => this.coinService.getAllCoin(start, limit, convert)),

            catchError((err, caught$) => {
                this.store.dispatch(homeActions.loadRequestFailed());
                return caught$;
            }),

            map((entity: CoinList) =>
                homeActions.loadRequestSuccess({ entity })
            ),
        )
    );

    loadCoinById$ = createEffect(() => this.actions$
        .pipe(
            ofType(homeActions.loadCoinById),
            mergeMap(({ id }) => this.coinService.getOneCoin(id)),
            catchError((err, caught$) => {
                this.store.dispatch(homeActions.loadRequestFailed());
                return caught$;
            }),
            map((entity: Coin) => homeActions.loadRequestSuccess({ entity })),
        )
    );

    loadQuoteCoin$ = createEffect(() => this.actions$
        .pipe(
            ofType(homeActions.loadQuoteCoin),
            mergeMap(({ id }) => this.coinService.getQuoteCoin(id)),
            catchError((err, caught$) => {
                this.store.dispatch(homeActions.loadRequestFailed());
                return caught$;
            }),
            map((entity: Coin) => homeActions.loadRequestSuccess({ entity })),
        )
    );
}
