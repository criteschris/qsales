import { always, compose, curry, defaultTo, either, isEmpty, isNil, map, prop, when } from 'ramda';

import { ISales } from '../types/ISales';
import { IOperationHour } from '../types/IOperationHour';
import { ISalesByHour } from '../types/ISalesByHour';

export const defaultSalesByHour = map<IOperationHour, ISalesByHour>(h => (
    {
        operationHourId: h.id,
        amount: 0,
        customers: 0
    } as ISalesByHour
));

export const getSalesByHoursOrDefault = curry((operationHours: IOperationHour[], sales: ISales) => compose<ISales, ISalesByHour[], ISalesByHour[], ISalesByHour[]>(defaultTo(defaultSalesByHour(operationHours)), when(either(isNil, isEmpty), always(null)), prop('salesByHours'))(sales));