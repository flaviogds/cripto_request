import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

import { Currency } from '../../../../entity/currency';

@Component({
  selector: 'crip-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input()
  locales$: Observable<Currency[]> | undefined;

  @Input()
  currency$: Observable<Currency> | undefined;

  @Output()
  newCurrency = new EventEmitter<string>();

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;


  ngOnInit(): void {
    this.locales$?.subscribe(locale => {
      this.options = locale.map(curr => curr.locale.concat(' (', curr.symbol, ')'));
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  currencyChanges(): void{
    this.newCurrency.emit('2781');
  }

  placeholder(currency: any): string{
    return currency.locale.concat(' (', currency.symbol, ')');
  }

}
