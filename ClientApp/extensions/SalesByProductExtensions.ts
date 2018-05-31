import { always, compose, curry, defaultTo, either, isEmpty, isNil, map, prop, when } from 'ramda';

import { IProductType } from "../types/IProductType";
import { ISalesByProductType } from '../types/ISalesByProductType';
import { ISales } from '../types/ISales';

export const defaultSalesByProductType = map<IProductType, ISalesByProductType>(p => (
    {
        productTypeId: p.id,
        amount: 0,
        productType: p
    } as ISalesByProductType
));

export const getSalesByProductTypeOrDefault = curry((operationHours: IProductType[], sales: ISales) => compose<ISales, ISalesByProductType[], ISalesByProductType[], ISalesByProductType[]>(defaultTo(defaultSalesByProductType(operationHours)), when(either(isNil, isEmpty), always(null)), prop('salesByProductTypes'))(sales));