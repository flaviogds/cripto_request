import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ServiceCoin } from 'src/app/services/coins.service';
import { Coin, CoinList } from 'src/app/entity/entity';
import * as homeAction from '../state/home.actions';

import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/entity/currency';

@Injectable()
export class CoinEffects{

    constructor(
        private actions$: Actions,
        private store: Store,
        private coinService: ServiceCoin,
        private currencyService: CurrencyService,
    ){}

    loadListOfCoinsDefault$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadListOfCoinsDefault),
                mergeMap(() =>
                    this.coinService.getAllCoin()),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
                    return caught$;
                }),
                map((response: CoinList) => homeAction.loadListOfCoinsConcluded({ response })),
            ),
    );

    loadListOfCoins$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadListOfCoins),
                mergeMap(({start, limit, convert}) =>
                    this.coinService.getAllCoinFiltered(start, limit, convert)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
                    return caught$;
                }),
                map((response: CoinList) => homeAction.loadListOfCoinsConcluded({ response })),
            ),
    );

    loadCoinById$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadCoinById),
                mergeMap(({ id }) =>
                    this.coinService.getCoinById(id)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
                    return caught$;
                }),
                map((details: Coin) => homeAction.loadCoinByIdOrNameConcluded({ details })),
            ),
    );

    loadCoinByName$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadCoinByName),
                mergeMap(({ name }) =>
                    this.coinService.getCoinByName(name)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
                    return caught$;
                }),
                map((details: Coin) => homeAction.loadCoinByIdOrNameConcluded({ details })),
            ),
    );

    loadQuoteById$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadQuoteById),
                mergeMap(({ id }) =>
                    this.coinService.getQuoteCoinById(id)),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
                    return caught$;
                }),
                map((details: Coin) => homeAction.loadCoinByIdOrNameConcluded({ details })),
            ),
    );

    loadLocales$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(homeAction.loadLocales),
                mergeMap(() => this.currencyService.getAllLocales()),
                catchError((err, caught$) => {
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
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
                    this.store.dispatch(homeAction.loadFailed( { response: err } ));
                    return caught$;
                }),
                map((currency: Currency) => homeAction.changeCurrencyConcluded({ currency })),
            ),
    );
}
