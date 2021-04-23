import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  @Input()
  range$: Observable<string> | undefined;

  @Output()
  newCurrency = new EventEmitter<string>();

  @Output()
  newRange = new EventEmitter<string>();

  currency: Currency | undefined;
  range: string | undefined;
  forms!: FormGroup;
  options: Currency[] | undefined;
  filteredOptions: Observable<Currency[]> | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.currency$?.subscribe((currency) => (this.currency = currency));
    this.locales$?.subscribe((data) => (this.options = data));
    this.range$?.subscribe((range) => (this.range = range));

    this.forms = this.formBuilder.group({
      formCurrency: [this.currency?.textValue],
      formRange: [this.range],
    });

    this.filteredOptions = this.forms?.controls.formCurrency.valueChanges.pipe(
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
    this.newRange.emit(this.forms?.controls.formRange.value);
    this.newCurrency.emit(
      this._filter(
        this.forms?.controls.formCurrency.value
          ? this.forms?.controls.formCurrency.value
          : this.currency?.textValue
      ).pop().id
    );
  }
}
