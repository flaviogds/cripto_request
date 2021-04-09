import { Observable } from 'rxjs';
import { Currency } from '../entity/currency';
import { Coin, CoinList } from '../entity/entity';

export function coinList(response: any, convert: string): CoinList{

    return {
        status:
        {
            timestamp: response.status.timestamp,
            total_count: response.status.total_count,
            currency: convert
        },
        data: response.data.map((entity: any) => makeCoin(entity))
    };
}

export function detailCoin(response: any, id: string): Coin{
    return {
        id: response.data[id].id,
        name: response.data[id].name,
        symbol: response.data[id].symbol,
        category: response.data[id].category,
        description: response.data[id].description,
        slug: response.data[id].slug,
        logo: response.data[id].log,
        subreddit: response.data[id].subreddit,
        tags: response.data[id].tags,
        tag_names: response.data[id]['tag-names'],
        tag_groups: response.data[id]['tag-groups'],
        platform: response.data[id].platform,
        date_added: response.data[id].date_added,
        num_market_pairs: undefined,
        max_supply: undefined,
        circulating_supply: undefined,
        total_supply: undefined,
        cmc_rank: undefined,
        last_updated: undefined,
        quote: undefined,
        urls: {
            website: response.data[id].urls.website,
            message_board: response.data[id].urls.message_board,
            explorer: response.data[id].urls.explorer,
            reddit: response.data[id].urls.reddit,
            technical_doc: response.data[id].urls.technical_doc,
            source_code: response.data[id].urls.source_code
        }
    };
}

function makeCoin(entity: any): Coin{
    return {
        id: entity.id,
        name: entity.name,
        symbol: entity.symbol,
        category: undefined,
        description: undefined,
        slug: entity.slug,
        logo: undefined,
        subreddit: undefined,
        tags: entity.tags,
        tag_names:  undefined,
        tag_groups: undefined,
        platform: entity.platform,
        date_added: entity.date_added,
        num_market_pairs: entity.num_market_pairs,
        max_supply: entity.max_supply,
        circulating_supply: entity.circulating_supply,
        total_supply: entity.total_supply,
        cmc_rank: entity.cmc_rank,
        last_updated: entity.last_updated,
        quote: makeQuote(entity.quote),
        urls: undefined,
    };
}

function makeQuote(quote: any): any {
    const key = Object.keys(quote).pop()?.toString();

    if (key !== undefined){
        return {
            currency: key,
            price: quote[key].price,
            volume_24h: quote[key].volume_24h,
            changes_1h:
            {
                value: quote[key].percent_change_1h,
                rateUp: trend(quote[key].percent_change_1h)
            },
            changes_24h:
            {
                value: quote[key].percent_change_24h,
                rateUp: trend(quote[key].percent_change_24h)
            },
            changes_7d: {
                value: quote[key].percent_change_7d,
                rateUp: trend(quote[key].percent_change_7d)
            },
            changes_30d: {
                value: quote[key].percent_change_30d,
                rateUp: trend(quote[key].percent_change_30d)
            },
            market_cap: quote[key].market_cap,
            last_updated: quote[key].last_updated
        };
    }else{
        return undefined;
    }
}

export function quoteCoin(response: any, id: string): Coin{
    return makeCoin(response.data[id]);
}

export function globalMetric(response: any): any{
    const key = Object.keys(response.data.quote).pop()?.toString();

    if (key !== undefined){
        return {
            active_cryptocurrencies: response.data.active_cryptocurrencies,
            total_cryptocurrencies: response.data.total_cryptocurrencies,
            active_market_pairs: response.data.active_market_pairs,
            active_exchanges: response.data.active_exchanges,
            total_exchanges: response.data.total_exchanges,
            eth_dominance: response.data.eth_dominance,
            btc_dominance: response.data.btc_dominance,
            defi_volume_24h: response.data.defi_volume_24h,
            defi_volume_24h_reported: response.data.defi_volume_24h_reported,
            defi_market_cap: response.data.defi_market_cap,
            defi_24h_percentage_change: response.data.defi_24h_percentage_change,
            stablecoin_volume_24h: response.data.stablecoin_volume_24h,
            stablecoin_volume_24h_reported: response.data.stablecoin_volume_24h_reported,
            stablecoin_market_cap: response.data.stablecoin_market_cap,
            stablecoin_24h_percentage_change: response.data.stablecoin_24h_percentage_change,
            derivatives_volume_24h: response.data.derivatives_volume_24h,
            derivatives_volume_24h_reported: response.data.derivatives_volume_24h_reported,
            derivatives_24h_percentage_change: response.data.derivatives_24h_percentage_change,
            quote:
            {
                currency: response.data.quote[key],
                total_market_cap: response.data.quote[key].total_market_cap,
                total_volume_24h: response.data.quote[key].total_volume_24h,
                total_volume_24h_reported: response.data.quote[key].total_volume_24h_reported,
                altcoin_volume_24h: response.data.quote[key].altcoin_volume_24h,
                altcoin_volume_24h_reported: response.data.quote[key].altcoin_volume_24h_reported,
                altcoin_market_cap: response.data.quote[key].altcoin_market_cap,
                last_updated: response.data.quote[key].last_updated
            },
            last_updated: response.data.last_updated
        };
    }else{
        return undefined;
    }
}

function trend(value: number): boolean{
    return (value / Math.abs(value)) !== -1;
}

export function makeCurrency( data: any | Observable<any> ): Currency[] {
    return data.map((curr: any) => ({
        id: curr.id,
        name: curr.name,
        currency: curr.currency,
        code: curr.code,
        symbol: curr.symbol
    }));
}
