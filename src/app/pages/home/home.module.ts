import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomePage } from './container/home.page';

import { featureKey } from './state/home.selectors';
import { reducers } from './state/home.reducer';
import { CoinEffects } from './state/home.effects';

import { MaterialModule } from '../../material/material.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    HomePage,
    NavbarComponent,
    FormComponent,
    TableComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([CoinEffects]),
  ]
})
export class HomeModule {}
