
export interface User {
    name: string
    documentType: string
    document: string
    role: string
    email: string
    clientId: string;
    image: any;
    status: boolean;
    phone: string;
}


export interface UserResponseApi {
    _id: string;
    name: string
    documentType: string
    document: string
    role: string
    email: string
    clientId: string;
    image: any;
    status: boolean;
    phone: string;
}