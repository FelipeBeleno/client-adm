

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

export interface ResponsePaginatedData {
    columns: ColumnTable[];
    rows: ClientRowTable[];
    count: number;
}

export interface ResponseSelectClient {
    image: string;

    name: string;

    _id: string;

}