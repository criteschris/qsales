import { IEmployee } from "./IEmployee";
import { ILocation } from "./ILocation";
import { IProductType } from "./IProductType";
import { IOperationHour } from "./IOperationHour";
import { ICondition } from "./ICondition";

export interface ISalesEntryInitialState {
    employees: IEmployee[];
    operationHours: IOperationHour[];
    locations: ILocation[];
    productTypes: IProductType[];
    conditions: ICondition[];
}