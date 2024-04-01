export interface Component {
    name: string;
    description: string;
    image?: File;
}


export interface ComponentResponse {
    name: string;
    description: string;
    image?: string;
    _id: string;
}