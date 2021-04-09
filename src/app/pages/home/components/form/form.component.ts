import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Currency } from '../../../../entity/currency'

const test = [
  { id: "2783", name: "Real", currency: "Brazilian",code: "BRL", symbol: "R$" },
  { id: "2821", name: "Peso", currency: "Argentine", code: "ARS", symbol: "$" },
  { id: "2781", name: "Dollar", currency: "United States", code: "USD", symbol: "$" },
  { id: "2790", name: "Euro", currency: "Europe", code: "EUR", symbol: "€" }
];


@Component({
  selector: 'crip-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myControl = new FormControl();
  options: Currency[] = test;

  filteredOptions: Observable<Currency[]> | undefined;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: Currency): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Currency[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
