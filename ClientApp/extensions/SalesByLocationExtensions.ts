import { always, compose, curry, defaultTo, either, isEmpty, isNil, map, prop, when } from 'ramda';

import { ISales } from '../types/ISales';
import { ILocation } from '../types/ILocation';
import { ISalesByLocation } from '../types/ISalesByLocation';


export const defaultSalesByLocation = map<ILocation, ISalesByLocation>(l => (
    {
        locationId: l.id,
        amount: 0,
        location: l
    } as ISalesByLocation
));

export const getSalesByLocationOrDefault = curry((operationHours: ILocation[], sales: ISales) => compose<ISales, ISalesByLocation[], ISalesByLocation[], ISalesByLocation[]>(defaultTo(defaultSalesByLocation(operationHours)), when(either(isNil, isEmpty), always(null)), prop('salesByLocations'))(sales));