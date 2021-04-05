import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePage } from './components/home.page';
import { StoreModule } from '@ngrx/store';
import { featureKey, featureReducer, reducers } from './components/ngrx';



@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(featureKey, reducers),
  ]
})
export class HomeModule { }
