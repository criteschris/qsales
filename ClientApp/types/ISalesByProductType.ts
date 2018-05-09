import { IProductType } from './IProductType';

export interface ISalesByProductType {
    id: number;
    productTypeId: number;
    entryDate: Date;
    amount: number;
    productType: IProductType;
}