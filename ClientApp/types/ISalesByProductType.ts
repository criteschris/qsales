import { IProductType } from './IProductType';
import { ISummable } from './ISummable';

export interface ISalesByProductType extends ISummable {
    id: number;
    productTypeId: number;
    entryDate: Date;
    //amount: number;
    productType: IProductType;
}