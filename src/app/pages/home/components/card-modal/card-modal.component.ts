import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/entity/entity';

interface TableQuoteModel {
  price: string;
  changes_1h: string;
  changes_24h: string;
  changes_7d: string;
  changes_30d: string;
  market_cap: string;
  volume_24h: string;
  list: () => string[];
}

interface TableLinkModel {
  website: string;
  technical_doc: string;
  source_code: string;
  explorer: string;
  list: () => string[];
}

@Component({
  selector: 'crip-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent {

  columnQuote: TableQuoteModel = {
    price: 'Price',
    changes_1h: 'Last Hour (%)',
    changes_24h: 'Today (%)',
    changes_7d: 'Last Week (%)',
    changes_30d: 'Last Month (%)',
    market_cap: 'Market Cap',
    volume_24h: 'Volume 24h',
    list: () => ([ 'price', 'changes_1h', 'changes_24h', 'changes_7d', 'changes_30d', 'volume_24h', 'market_cap' ])
  };

  columnLiks: TableLinkModel = {
    website: 'Website',
    technical_doc: 'Documentation',
    source_code: 'Source Code',
    explorer: 'View more',
    list: () => ([ 'website', 'technical_doc', 'source_code', 'explorer', ])
  };

  @Input()
  data: Coin | undefined;

  include(key: string, ...args: string[]): boolean{
    return args.includes(key);
  }

  moduleOfNumber(num: number): number{
    return Math.abs(num);
  }
}
