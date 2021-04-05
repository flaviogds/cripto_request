import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './components/home.page';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer } from './state/home.reducer';
import { HomeEffects } from './state/home.effects';



@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ]
})
export class HomeModule { }
