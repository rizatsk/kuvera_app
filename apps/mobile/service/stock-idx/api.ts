import environment from '@/constants/environment';
import mapDataStockIdx, { respStockIdxProps } from '@/helper/mapRespStockIdx';
import { DataStocksProps } from '@/states/stock-idx/type';
import axios from 'axios';

export async function ApiStockIdx(): Promise<DataStocksProps[]> {
    try {
        const { data: result } = await axios({
            method: 'POST',
            url: environment.STOCK_IDX_API_URL,
            data: {
                "lang": "id_ID",
                "range": [0, 999]
            },
            headers: {
                referer: "https://id.tradingview.com/",
                origin: "https://id.tradingview.com"
            }
        });

        return mapDataStockIdx(result as respStockIdxProps);
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
}