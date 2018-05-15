import { IEmployee } from "./IEmployee";
import { ILocation } from "./ILocation";
import { IProductType } from "./IProductType";
import { IOperationHour } from "./IOperationHour";
import { ICondition } from "./ICondition";
import { ISales } from "./ISales";
import { IEvent } from "./IEvent";
import { IOrganization } from "./IOrganization";
import { IPerformer } from "./IPerformer";

export interface ISalesEntryInitialState extends ISalesEntrySalesData, ISalesEntryFacets {
    
}

export interface ISalesEntryFacets {
    employees: IEmployee[];
    events: IEvent[];
    operationHours: IOperationHour[];
    locations: ILocation[];
    organizations: IOrganization[];
    performers: IPerformer[];
    productTypes: IProductType[];
    conditions: ICondition[];
}

export interface ISalesEntrySalesData {
    sales: ISales;
}