export interface Product {
    name: string;
    description: string;
    image?: File;
    components: component[];
    value: number;
    clientId: string;
}


export interface component {
    componentId: string;
    name: string;
    stockRequired: number;
    image: string|undefined;
}