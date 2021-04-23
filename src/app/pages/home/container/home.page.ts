import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as homeSelectors from '../state/home.selectors';
import * as homeActions from '../state/home.actions';

import { Coin, CoinList } from 'src/app/entity/coins-entity';
import { Currency } from 'src/app/entity/currency-entity';

import { DetailComponent } from '../components/details/detail.component';
import { DialogAboutComponent } from '../components/dialog-about/dialog-about.component';

@Component({
  selector: 'crip-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  private dialogRef: MatDialogRef<any> | undefined;

  details$: Observable<Coin> | undefined;
  response$: Observable<CoinList> | undefined;

  currency$: Observable<Currency> | undefined;
  locales$: Observable<Currency[]> | undefined;
  range$: Observable<string> | undefined;

  loading$: Observable<boolean> | undefined;
  failed$!: Observable<any> | undefined;

  coinToDetail: Coin | undefined;
  range: string | undefined;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.response$ = this.store.pipe(select(homeSelectors.selectResponse));
    this.details$ = this.store.pipe(select(homeSelectors.selectDetails));

    this.loading$ = this.store.pipe(select(homeSelectors.selectLoading));
    this.failed$ = this.store.pipe(select(homeSelectors.selectFailed));

    this.currency$ = this.store.pipe(select(homeSelectors.selectCurrency));
    this.locales$ = this.store.pipe(select(homeSelectors.selectLocalesList));
    this.range$ = this.store.pipe(select(homeSelectors.selectRange));

    this.store.dispatch(homeActions.loadLocales());
    this.range$?.subscribe((range) => (this.range = range));

    this.startApplication();
  }

  startApplication(): void {
    this.currency$?.subscribe((currency) =>
      this.store.dispatch(
        homeActions.loadListOfCoins({
          param: {
            limit: this.range,
            convert: currency.code,
          },
        })
      )
    );
  }

  details(id: string): void {
    this.response$?.subscribe((response) => {
      this.coinToDetail = response.data
        .filter((coin) => coin.id.toString() === id)
        .pop();
    });
    this.store.dispatch(homeActions.loadCoinByIdOrName({ param: { id } }));

    if (this.dialogRef === undefined) {
      this.details$?.subscribe((details) =>
        this.openDialog(DetailComponent, {
          data: { ...this.coinToDetail, details },
        })
      );
    }
  }

  about(): void {
    this.openDialog(DialogAboutComponent, {});
  }

  newCurrency(id: string): void {
    this.store.dispatch(homeActions.changeCurrency({ id }));
  }

  newRange(range: string): void {
    this.store.dispatch(homeActions.changeRangeOfCoins({ range }));
  }

  openDialog(component: any, data: any): void {
    this.dialogRef = this.dialog.open(component, data);
  }
}
