import { File } from "buffer";

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
}