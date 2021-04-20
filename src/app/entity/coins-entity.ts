export interface CoinList {
  status: {
    timestamp: string;
    total_count: number;
    currency: string;
  };
  data: Coin[];
}
export interface Coin {
  id: number;
  name: string;
  symbol: string;
  num_market_pairs: number;
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  cmc_rank: number;
  last_updated: string;
  details: Details | null;
  quote: Quote | null;
}

export interface Details {
  id: number;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  tags: string[];
  tag_names: string[];
  tag_groups: string[];
  platform: string;
  date_added: string;
  urls: {
    website: string[];
    message_board: string[];
    explorer: string[];
    reddit: string[];
    technical_doc: string[];
    source_code: string[];
  };
}

export interface Quote {
  currency: string;
  price: number;
  volume_24h: number;
  changes_1h: {
    value: number;
    rateUp: boolean;
  };
  changes_24h: {
    value: number;
    rateUp: boolean;
  };
  changes_7d: {
    value: number;
    rateUp: boolean;
  };
  changes_30d: {
    value: number;
    rateUp: boolean;
  };
  market_cap: number;
  last_updated: string;
}
