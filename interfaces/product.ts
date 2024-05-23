export interface Product {
    name: string;
    description: string;
    image?: string| File;
    components: component[];
    value: number;
    clientId: string;
    _id?: string
}

export interface component {
    componentId: string;
    name: string;
    stockRequired: number;
    image: string|undefined;
}