import { DataStocksProps } from "@/states/stock-idx/type";

export type respStockIdxProps = {
    totalCount: number,
    symbols: string[],
    data: TickerUniversalStockIdxProps[]
};

type TickerUniversalStockIdxProps = {
    id: string
    rawValues: ListStockIdxProps[] | string[] | number[]
    viewPropsArgs: string[][] | []
};

type ListStockIdxProps = {
    description: string
    exchange: string
    kind: string
    "kind-delay": number
    logo: {
        logoid: string;
        style: string;
    }
    name: string
    type: string
    typespecs: Array<string>
};

const mapDataStockIdx = (respStockIdx: respStockIdxProps): DataStocksProps[] => {
    let listPrices: number[] = [],
        listChange: number[] = [],
        listDividen: number[] = [],
        listAnalyst: string[] = [],
        listStock: ListStockIdxProps[] = [];

    respStockIdx.data.map((data) => {
        switch (data.id) {
            case 'Price':
                listPrices = data.rawValues as number[];
                break;
            case 'Change':
                listChange = data.rawValues as number[];
                break;
            case 'DividendsYield':
                listDividen = data.rawValues as number[];
                break;
            case 'AnalystRating':
                listAnalyst = data.viewPropsArgs as string[];
                break;
            case 'TickerUniversal':
                listStock = data.rawValues as ListStockIdxProps[];
                break;
            default:
                return;
        }
    });

    const stocks = listStock.map((list, index) => {
        const newList = list as ListStockIdxProps
        const stock: Record<string, any> = {
            stockCode: newList.name,
            stockName: newList.description,
            logoId: newList?.logo?.logoid || '',
        }

        stock.price = listPrices[index]
        stock.change = Number(listChange[index].toFixed(2))
        stock.dividen = Math.floor(listDividen[index] as number * 100) / 100;
        stock.analyst = listAnalyst[index]

        return stock;
    });

    return stocks as DataStocksProps[];
}

export default mapDataStockIdx