import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as homeSelectors from '../state/home.selectors';
import * as homeActions from '../state/home.actions';

@Component({
  selector: 'crip-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();

  response$: Observable<any> | undefined;
  loading$: Observable<boolean> | undefined;
  failed$: Observable<boolean> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.response$ = this.store.pipe(select(homeSelectors.selectResponse));
    this.loading$ = this.store.pipe(select(homeSelectors.selectLoading));
    this.failed$ = this.store.pipe(select(homeSelectors.selectFailed));

    this.go();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(homeActions.clearState());
  }

  go(): void{
    this.store.dispatch(
      homeActions.loadListOfCoins({ start: '1', limit: '50', convert: 'USD' })
    );
  }
}
