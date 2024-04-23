

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
