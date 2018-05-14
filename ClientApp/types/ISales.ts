import { IIndexableObject } from "./IIndexableObject";
import { IEvent } from "./IEvent";
import { IOrganization } from "./IOrganization";
import { ISalesByHour } from "./ISalesByHour";
import { ISalesByLocation } from "./ISalesByLocation";
import { ISalesByProductType } from "./ISalesByProductType";

export interface ISales {
    id: number;
    eventId?: number;
    organizationId?: number;
    entryDate: Date;
    hundreds: number;
    fifties: number;
    twenties: number;
    tens: number;
    fives: number;
    ones: number;
    creditCardAmount: number;
    event?: IEvent;
    organization?: IOrganization;
    salesByHours: ISalesByHour[];
    salesByLocations: ISalesByLocation[];
    salesByProductTypes: ISalesByProductType[];
}