import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ObservableLike, Subject } from 'rxjs';
import { loadListOfCoins } from './ngrx';

@Component({
  selector: 'crip-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject();

  response$: Observable<any> | undefined;
  response: any;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    //this.store.dispatch(homeActions.clearHomeState());
  }

  go(): void{
    //this.store.dispatch(homeActions.loadCoins({ start: '1', limit: '50', convert: 'USD' }));
    // console.log(this.lisfOfCoins);
  }

}
