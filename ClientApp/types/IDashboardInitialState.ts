import { ISales } from "./ISales";
import { ISalesByHour } from "./ISalesByHour";
import { ISalesByLocation } from "./ISalesByLocation";
import { ISalesByProductType } from "./ISalesByProductType";

export interface IDashboardInitialState {
    sales: ISales;
    salesByHour: ISalesByHour[];
    salesByLocation: ISalesByLocation[];
    salesByProductType: ISalesByProductType[];
}