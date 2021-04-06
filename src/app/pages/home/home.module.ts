import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomePage } from './container/home.page';

import { featureKey } from './state/home.selectors';
import { reducers } from './state/home.reducer';
import { CoinEffects } from './state/home.effects';

import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    HomePage,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([CoinEffects]),
  ]
})
export class HomeModule { }
