import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Currency } from 'src/app/entity/currency-entity';

@Component({
  selector: 'crip-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input()
  locales$: Observable<Currency[]> | undefined;

  @Input()
  currency$: Observable<Currency> | undefined;

  currency: Currency | undefined;

  @Output()
  newCurrency = new EventEmitter<string>();

  input: FormControl | undefined;
  options: Currency[] | undefined;
  filteredOptions: Observable<Currency[]> | undefined;

  ngOnInit(): void {
    this.input = new FormControl();

    this.currency$?.subscribe((currency) => (this.currency = currency));

    this.locales$?.subscribe((data) => (this.options = data));

    this.filteredOptions = this.input.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    if (this.options) {
      return this.options?.filter((locale) =>
        locale.textValue.toLowerCase().includes(filterValue)
      );
    }
  }

  currencyChanges(): void {
    this.newCurrency.emit(
      this._filter(
        this.input?.value ? this.input?.value : this.currency?.locale
      ).pop().id
    );
  }
}
