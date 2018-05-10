import { ICondition } from './ICondition';
import { IOperationHour } from './IOperationHour';

export interface ISalesByHour {
    id: number;
    operationHourId: number;
    conditionId: number;
    entryDate: Date;
    amount: number;
    customers: number;
    operationHour: IOperationHour;
    condition: ICondition;
}