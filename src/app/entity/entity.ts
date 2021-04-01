export interface CoinList {
    status:
    {
        timestamp: string,
        total_count: number
    },
    data: Coin[]
}
export interface Coin {
    id: number,
    name: string,
    symbol: string,
    category: string | undefined,
    description: string | undefined, 
    slug: string,
    logo: string | undefined,
    subreddit: string | undefined,
    tags: string[],
    tag_names: string[] | undefined,
    tag_groups: string[] | undefined,
    platform: string,
    date_added: string,
    num_market_pairs: number | undefined,
    max_supply: number | undefined,
    circulating_supply: number | undefined,
    total_supply: number | undefined,
    cmc_rank: number | undefined,
    last_updated: string | undefined,
    quote: Quote | undefined
    urls:
    {
        website: string[],
        message_board: string[],
        explorer: string[],
        reddit: string[],
        technical_doc: string[],
        source_code: string[]
    } | undefined
}

export interface Quote {
    currency: string,
    price: number,
    volume_24h: number,
    percent_change_1h: number,
    percent_change_24h: number,
    percent_change_7d: number,
    percent_change_30d: number,
    market_cap: number,
    last_updated: string
}

export interface Global {
    active_cryptocurrencies: number,
    total_cryptocurrencies: number,
    active_market_pairs: number,
    active_exchanges: number,
    total_exchanges: number,
    eth_dominance: number,
    btc_dominance: number,
    defi_volume_24h:number,
    defi_volume_24h_reported: number,
    defi_market_cap: number,
    defi_24h_percentage_change: number,
    stablecoin_volume_24h: number,
    stablecoin_volume_24h_reported: number,
    stablecoin_market_cap: number,
    stablecoin_24h_percentage_change: number,
    derivatives_volume_24h: number,
    derivatives_volume_24h_reported: number,
    derivatives_24h_percentage_change: number,
    quote: 
    {
        currency: string,
        total_market_cap: number,
        total_volume_24h: number,
        total_volume_24h_reported: number,
        altcoin_volume_24h: number,
        altcoin_volume_24h_reported: number,
        altcoin_market_cap: number,
        last_updated: string
    },
    last_updated: string
}