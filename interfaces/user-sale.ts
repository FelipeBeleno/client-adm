export interface UserSaleInterface {
    _id?: string;
    name: string;
    documentType: string;
    document: string;
    phone: string;
    address: string;
    clientId: string;
    email: string;
}

export const keysUserSale: (keyof UserSaleInterface)[] = [
    "name",
    "documentType",
    "document",
    "phone",
    "address",
    "clientId",
    "email"
]