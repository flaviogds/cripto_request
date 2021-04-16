import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as homeSelectors from '../state/home.selectors';
import * as homeActions from '../state/home.actions';

import { ModalComponent } from '../components/modal/modal.component';
import { Coin, CoinList } from 'src/app/entity/entity';
import { Currency } from 'src/app/entity/currency';
import { CurrencyService } from 'src/app/services/currency.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'crip-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();
  private dialogRef: MatDialogRef<ModalComponent> | undefined;

  details$: Observable<Coin> | undefined;
  response$: Observable<CoinList> | undefined;

  currency$: Observable<Currency> | undefined;
  locales$: Observable<Currency[]> | undefined;

  loading$: Observable<boolean> | undefined;
  failed$: Observable<boolean> | undefined;

  coinToDetail: Coin | undefined;

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.response$ = this.store.pipe(select(homeSelectors.selectResponse));
    this.details$ = this.store.pipe(select(homeSelectors.selectDetails));

    this.loading$ = this.store.pipe(select(homeSelectors.selectLoading));
    this.failed$ = this.store.pipe(select(homeSelectors.selectFailed));

    this.currency$ = this.store.pipe(select(homeSelectors.selectCurrency));
    this.locales$ = this.store.pipe(select(homeSelectors.selectLocalesList));

    this.go();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(homeActions.clearState());
  }

  /* the go() function caller a action to loader store */
  go(): void{
    this.currency$?.subscribe(currency => {
      this.store.dispatch(
        homeActions.loadListOfCoins({ start: '1', limit: '10', convert: currency.code }),
      );
    });
    this.store.dispatch(homeActions.loadLocales());
  }

  details(id: string): void{
    this.response$?.subscribe(response => {
      this.coinToDetail = response.data.filter(coin => coin.id.toString() === id).pop();
    });
    this.store.dispatch(homeActions.loadCoinById({ id }));
    this.openDialog();
  }

  currency(id: string): void{
    this.store.dispatch(homeActions.changeCurrency({ id }));
  }

  openDialog(): void {
    if (this.dialogRef === undefined){
      this.details$?.subscribe(details =>
        this.dialogRef = this.dialog.open(
          ModalComponent,
          { data: { ...this.coinToDetail, details } }
        ));
    }
  }
}
