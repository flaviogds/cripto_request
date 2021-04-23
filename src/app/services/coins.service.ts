import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { CoinList, Coin } from 'src/app/entity/coins-entity';
import { detailCoin, coinList, quoteCoin } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ServiceCoin{

  constructor(private http: HttpClient) {  }

  getAllCoins( param?: any): Observable<CoinList>{
    const params = new HttpParams( { fromObject: { ...param } } );

    return this.request<any>('cryptocurrency/listings/latest', params)
      .pipe(map((response: any) => coinList(response, param.convert)));
  }

  getCoinByIdOrName(param: any): Observable<any>{
    const value = param[Object.keys(param)[0]];

    const params = new HttpParams( { fromObject: { ...param } } );

    return this.request<any>('cryptocurrency/info', params)
      .pipe(map((response: any) => detailCoin(response, value)));
  }

  getQuoteCoinById(id: string): Observable<Coin>{
    const params = new HttpParams( { fromObject: { id } } );

    return this.request<any>('cryptocurrency/quotes/latest', params)
      .pipe(map((response: any) => quoteCoin(response, id)));
  }

  private request<T>(endpoint: string, params?: HttpParams): Observable<T>{
    const headers = new HttpHeaders()
      .append('JSON', 'true')
      .append('X-CMC_PRO_API_KEY', environment.API_KEY);

    return this.http.get<T>(`https://cors-anywhere.herokuapp.com/${environment.apiUrl}${endpoint}`, { headers, params });
  }
}
