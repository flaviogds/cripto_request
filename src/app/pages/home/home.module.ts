import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from 'src/app/material/material.module';

import { HomePage } from './container/home.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/container/table.component';
import { DetailComponent } from './components/details/detail.component';
import { DetailCardComponent } from './components/detail-card/container/detail-card.component';

import { featureKey } from './state/home.selectors';
import { reducers } from './state/home.reducer';
import { CoinEffects } from './state/home.effects';
import { DialogAboutComponent } from './components/dialog-about/dialog-about.component';

@NgModule({
  declarations: [
    HomePage,
    NavbarComponent,
    FormComponent,
    TableComponent,
    DetailComponent,
    DetailCardComponent,
    DialogAboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([CoinEffects]),
  ]
})
export class HomeModule {}
