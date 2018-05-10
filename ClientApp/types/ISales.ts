import { IIndexableObject } from "./IIndexableObject";

export interface ISales {
    id: number;
    entryDate: Date;
    hundredDollarBills: number;
    fiftyDollarBills: number;
    twentyDollarBills: number;
    tenDollarBills: number;
    fiveDollarBills: number;
    oneDollarBills: number;
    creditCardAmount: number;
}