import { CalendarDate } from "@internationalized/date";


export interface Client {
    name: string;
    documentType: string;
    document: string;
    isSubscription: boolean;
    payDay: number;
    package: string;
    payRate: number;
    image: any;
    email: string;
    phone: string;
    address: string;
    status: boolean
}


export interface ClientRowTable {
    key: number;
    image: any;
    name: string;
    email: string;
    document: string;
    status: string;

}


export interface ColumnTable {
    key: string;
    label: string
}

export interface ResponsePaginatedDataStock {
    columns: ColumnTable[];
    rows: StockRowTable[];
    count: number;
}

export interface StockComponentRowTable {
    key: string| undefined;
    stock: number| undefined;
    value: number| undefined;
    dueDate: Date| undefined ;
    status: boolean| undefined;
    option: null| undefined
}

export interface ResponsePaginatedDataStockDetail{
    columns: ColumnTable[];
    rows: StockComponentRowTable[];
    count: number;
}


export interface ResponsePaginatedData {
    columns: ColumnTable[];
    rows: ClientRowTable[] | ComponentRowTable[] 
    count: number;
}

export interface ResponseSelectClient {
    image: string;

    name: string;

    _id: string;

}

export interface StockRowTable {
    key: string;
    image: any;
    name: string;
    option: ()=> React.JSX.Element
}


export interface ComponentRowTable {
    key: number;
    image: any;
    name: string;
    option: ()=> React.JSX.Element
}
