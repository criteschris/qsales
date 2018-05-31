import { ILocation } from './ILocation';
import { ISummable } from './ISummable';

export interface ISalesByLocation extends ISummable {
    id: number;
    locationId: number;
    entryDate: Date;
    //amount: number;
    location: ILocation;
}