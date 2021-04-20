import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/entity/coins-entity';
import { TableLinkModel, TableQuoteModel } from '../entity/table-entity';
import { columnQuote, columnLinks } from '../entity/table-enum';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'crip-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
})
export class DetailCardComponent {

  columnQuote: TableQuoteModel = {
    ...columnQuote,
    list: () => [
      'price',
      'changes_1h',
      'changes_24h',
      'changes_7d',
      'changes_30d',
      'volume_24h',
      'market_cap',
    ],
    getName: (key: string) =>
      Object.entries(columnQuote)
        .filter(entrie => entrie[0].match(key))[0][1],
  };

  columnLinks: TableLinkModel = {
    ...columnLinks,
    list: () => [
      'website',
      'technical_doc',
      'source_code',
      'explorer'
    ],
    getName: (key: string) =>
      Object.entries(columnLinks)
        .filter(entrie => entrie[0].match(key))[0][1],
  };

  @Input()
  data: Coin | undefined ;

  mapProperty(property: any, ...args: string[]): any{
    let value = property;

    args.forEach(key =>  value = value[key]);

    return value;
  }

  include(key: string, ...args: string[]): boolean {
    return args.includes(key);
  }

  moduleOfNumber(num: number): number {
    return Math.abs(num);
  }

  getImage(id: any): string{
    return environment.imagUrl.concat(`${id}.png`);
  }
}
