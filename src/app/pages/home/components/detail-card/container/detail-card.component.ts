import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/entity/coins-entity';
import { TableLinkModel, TableQuoteModel } from '../entity/table-entity';
import { columnQuote, columnLiks } from '../entity/table-enum';

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
  };

  columnLiks: TableLinkModel = {
    ...columnLiks,
    list: () => [
      'website',
      'technical_doc',
      'source_code',
      'explorer'
    ],
  };

  @Input()
  data: Coin | undefined;

  include(key: string, ...args: string[]): boolean {
    return args.includes(key);
  }

  moduleOfNumber(num: number): number {
    return Math.abs(num);
  }
}
