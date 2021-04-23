import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ServiceCoin } from 'src/app/services/coins.service';
import { Coin, CoinList } from 'src/app/entity/coins-entity';
import * as homeAction from '../state/home.actions';

import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/entity/currency-entity';

@Injectable()
export class CoinEffects{

    constructor(
        private actions$: Actions,
        private store: Store,
        private coinService: ServiceCoin,
        private currencyService: CurrencyService,
    ){}

    loadListOfCoins$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadListOfCoins),
                mergeMap(({ param }) =>
                    this.coinService.getAllCoins(param)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { status: true, response: err } ));
                    return caught$;
                }),
                map((response: CoinList) => homeAction.loadListOfCoinsConcluded({ response })),
            ),
    );

    loadCoinByIdOrName$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadCoinByIdOrName),
                mergeMap(({ param }) =>
                    this.coinService.getCoinByIdOrName(param)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { status: true, response: err } ));
                    return caught$;
                }),
                map((details: Coin) => homeAction.loadCoinAndQuoteByIdOrNameConcluded({ details })),
            ),
    );

    loadQuoteById$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadQuoteById),
                mergeMap(({ id }) =>
                    this.coinService.getQuoteCoinById(id)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { status: true, response: err } ));
                    return caught$;
                }),
                map((details: Coin) => homeAction.loadCoinAndQuoteByIdOrNameConcluded({ details })),
            ),
    );

    loadLocales$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadLocales),
                mergeMap(() => this.currencyService.getAllLocales()),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { status: true, response: err } ));
                    return caught$;
                }),
                map((locales: Currency[]) => homeAction.loadLocalesConcluded({ locales })),
            ),
    );

    changeCurrency$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.changeCurrency),
                mergeMap(({ id }) => this.currencyService.getCurrency( id )),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { status: true, response: err } ));
                    return caught$;
                }),
                map((currency: Currency) => homeAction.changeCurrencyConcluded({ currency })),
            ),
    );
}
