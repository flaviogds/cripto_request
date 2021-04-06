import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { HomePage } from './container/home.page';

import { FlexLayoutModule } from '@angular/flex-layout';

import { featureKey } from './state/home.selectors';
import { reducers } from './state/home.reducer';
import { CoinEffects } from './state/home.effects';

import { ListComponent } from './components/list/list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';

@NgModule({
  declarations: [
    HomePage,
    ListComponent,
    SidebarComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatTableModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatButtonModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([CoinEffects]),
  ]
})
export class HomeModule { }
