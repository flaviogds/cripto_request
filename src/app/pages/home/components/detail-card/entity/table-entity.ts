export interface TableQuoteModel {
  price: string;
  changes_1h: string;
  changes_24h: string;
  changes_7d: string;
  changes_30d: string;
  market_cap: string;
  volume_24h: string;
  list: () => string[];
  getName: (key: string) => string;
}

export interface TableLinkModel {
  website: string;
  technical_doc: string;
  source_code: string;
  explorer: string;
  list: () => string[];
  getName: (key: string) => string;
}
