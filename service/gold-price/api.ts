import environment from '@/constants/environment';
import { GoldAntam, ListGoldProps } from '@/states/gold-antam-price/type';
import axios from 'axios';

export async function ApiGoldAntamPrice(): Promise<GoldAntam[]> {
    try {
        const {data: result} = await axios({
            method: 'GET',
            url: environment.BASE_API_URL + '/service/price-gold-antam'
        });

        return result.data;
    } catch(error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
}

export async function ApiGoldPrice(): Promise<ListGoldProps[]> {
    try {
        const {data: result} = await axios({
            method: 'GET',
            url: environment.BASE_API_URL + '/service/price-gold/all'
        });

        return result.data;
    } catch(error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
}