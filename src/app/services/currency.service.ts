import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Currency } from '../entity/currency-entity';
import { createLocale, createLocaleList } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {  }

  getAllLocales(): Observable<Currency[]> {
    return this.localRequest('./assets/currency-reference.json')
      .pipe(
        map((response: any) => createLocaleList(response))
      );
  }

  getCurrency( id: string ): Observable<Currency> {
    return this.localRequest('./assets/currency-reference.json')
      .pipe(
        map((response: any) => createLocale(response, id))
      );
  }

  private localRequest(localAdress: string): Observable<any> {
    return this.http.get(localAdress);
  }
}
