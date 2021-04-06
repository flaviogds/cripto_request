import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ServiceCoin } from 'src/app/services/coins.service';
import * as homeAction from '../state/home.actions';


@Injectable()
export class CoinEffects{

    constructor(
        private actions$: Actions,
        private store: Store,
        private coinService: ServiceCoin
    ){}

    loadListOfCoins$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadListOfCoins),
                mergeMap(({start, limit, convert}) =>
                    this.coinService.getAllCoin(start, limit, convert)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.requisitionFailed());
                    return caught$;
                }),
                map((response: any) => homeAction.requisitionConcluded({ response })),
            ),
    );
    loadCoinById$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadCoinById),
                mergeMap(({ id }) =>
                    this.coinService.getOneCoin(id)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.requisitionFailed());
                    return caught$;
                }),
                map((response: any) => homeAction.requisitionConcluded({ response })),
            ),
    );

    loadQuoteById$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadQuoteById),
                mergeMap(({ id }) =>
                    this.coinService.getQuoteCoin(id)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.requisitionFailed());
                    return caught$;
                }),
                map((response: any) => homeAction.requisitionConcluded({ response })),
            ),
    );
}
