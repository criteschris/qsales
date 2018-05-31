import { ICondition } from './ICondition';
import { IOperationHour } from './IOperationHour';
import { ISummable } from './ISummable';

export interface ISalesByHour extends ISummable {
    id: number;
    operationHourId: number;
    conditionId: number;
    entryDate: Date;
    //amount: number;
    customers: number;
    operationHour: IOperationHour;
    condition: ICondition;
}