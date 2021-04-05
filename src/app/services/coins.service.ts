import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { CoinList, Coin } from 'src/app/entity/entity';
import { detailCoin, coinList, quoteCoin } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ServiceCoin{

  constructor(private http: HttpClient) {  }

  getAllCoin(start: string, limit: string, convert: string): Observable<CoinList>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, start, limit, convert } } );

    return this.request<any>('cryptocurrency/listings/latest', params)
      .pipe(map((response: any) => coinList(response)));
  }

  getOneCoin(id: string): Observable<Coin>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, id } } );

    return this.request<any>('cryptocurrency/info', params)
      .pipe(map((response: any) => detailCoin(response, id)));
  }

  getQuoteCoin(id: string): Observable<Coin>{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY, id } } );

    return this.request<any>('cryptocurrency/quotes/latest', params)
      .pipe(map((response: any) => quoteCoin(response, id)));
  }

  /*
  getGlobalMetrics(): Global{
    const params = new HttpParams( { fromObject: { CMC_PRO_API_KEY: environment.API_KEY } } );

    return this.request<any>('global-metrics/quotes/latest', params)
      .pipe(map((response: any) => globalMetric(response)));
  }
  */

  private request<T>(url: string, params: HttpParams): Observable<T>{
    return this.http.get<T>(environment.apiUrl.concat(url), { params });
  }
}
