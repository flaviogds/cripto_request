import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { selectFailed, selectFeature, selectLoading, selectResponse } from '../state/home.selectors';
import { clearState, loadCoinById, loadListOfCoins } from '../state/home.actions';

import { Coin, CoinList } from 'src/app/entity/entity';

@Component({
  selector: 'crip-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();

  response$: Observable<any> | undefined;
  responseData: any | undefined;

  loading$: Observable<boolean> | undefined;
  failed$: Observable<boolean> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.response$ = this.store.pipe(select(selectResponse));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.failed$ = this.store.pipe(select(selectFailed));

    this.response$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(response => this.responseData = [...response]);

    this.go();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(clearState());
  }

  go(): void{
    this.store.dispatch(
      loadListOfCoins({ start: '1', limit: '50', convert: 'USD' })
    );
  }
}
