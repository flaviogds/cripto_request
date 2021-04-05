import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as homeSelector from '../state/home.selectors';
import * as homeActions from '../state/home.actions';
import { CoinList } from 'src/app/entity/entity';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'crip-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();

  lisfOfCoins$: Observable<any> | undefined;
  lisfOfCoins: any | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.lisfOfCoins$ = this.store.pipe(
        select(homeSelector.selectSuccess)
      );

    this.lisfOfCoins$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((list: CoinList) => this.lisfOfCoins = list);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(homeActions.clearHomeState());
  }

  go(): void{
    this.store.dispatch(homeActions.loadCoins({ start: '1', limit: '50', convert: 'USD' }));
    // console.log(this.lisfOfCoins);
  }

}
