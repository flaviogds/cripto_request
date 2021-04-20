import { Observable } from 'rxjs';
import { Currency } from '../entity/currency-entity';
import { Coin, CoinList, Details } from '../entity/coins-entity';

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

export function detailCoin(response: any, key: string): Details{
    return {
        id: response.data[key].id,
        category: response.data[key].category,
        description: response.data[key].description,
        slug: response.data[key].slug,
        logo: response.data[key].log,
        subreddit: response.data[key].subreddit,
        tags: response.data[key].tags,
        tag_names: response.data[key]['tag-names'],
        tag_groups: response.data[key]['tag-groups'],
        platform: response.data[key].platform,
        date_added: response.data[key].date_added,
        urls: {
            website: response.data[key].urls.website,
            message_board: response.data[key].urls.message_board,
            explorer: response.data[key].urls.explorer,
            reddit: response.data[key].urls.reddit,
            technical_doc: response.data[key].urls.technical_doc,
            source_code: response.data[key].urls.source_code
        }
    };
}

function makeCoin(entity: any): Coin{
    return {
        id: entity.id,
        name: entity.name,
        symbol: entity.symbol,
        num_market_pairs: entity.num_market_pairs,
        max_supply: entity.max_supply,
        circulating_supply: entity.circulating_supply,
        total_supply: entity.total_supply,
        cmc_rank: entity.cmc_rank,
        last_updated: entity.last_updated,
        details: undefined,
        quote: makeQuote(entity.quote),
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

export function createLocaleList( data: any | Observable<any> ): Currency[] {
    return data.locale.map((curr: any) => locale(curr));
}

export function createLocale( data: any | Observable<any>, id: string ): Currency {
    return locale(data.locale.filter((curr: any) => curr.id === id)[0]);
}

function locale( data: any): Currency {
    return ({
        id: data.id,
        name: data.name,
        locale: data.locale,
        textValue: ''.concat(`${data.locale} (${data.code})`),
        code: data.code,
        symbol: data.symbol
    });
}
