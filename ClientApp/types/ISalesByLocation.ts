import { ILocation } from './ILocation';

export interface ISalesByLocation {
    id: number;
    locationId: number;
    entryDate: Date;
    amount: number;
    location: ILocation;
}