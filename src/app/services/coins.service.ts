import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  getAllCoin(): Observable<CoinList>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY } } );

    return this.request<any>('cryptocurrency/listings/latest', params)
      .pipe(map((response: any) => coinList(response, 'default')));
  }

  getAllCoinFiltered(start: string, limit: string, convert: string): Observable<CoinList>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, start, limit, convert } } );

    return this.request<any>('cryptocurrency/listings/latest', params)
      .pipe(map((response: any) => coinList(response, convert)));
  }

  getCoinById(id: string): Observable<any>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, id } } );

    return this.request<any>('cryptocurrency/info', params)
      .pipe(map((response: any) => detailCoin(response, id)));
  }

  getCoinByName(name: string): Observable<any>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, name } } );

    return this.request<any>('cryptocurrency/info', params)
      .pipe(map((response: any) => detailCoin(response, name)));
  }

  getQuoteCoinById(id: string): Observable<Coin>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, id } } );

    return this.request<any>('cryptocurrency/quotes/latest', params)
      .pipe(map((response: any) => quoteCoin(response, id)));
  }

  private request<T>(url: string, params: HttpParams): Observable<T>{
    return this.http.get<T>(environment.apiMock.concat(url), { params });
  }
}
