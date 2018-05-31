import { compose, curry, defaultTo, pluck, sum } from 'ramda';

import { ConvertToCurrencyString } from '../utilities/CurrencyMath';

import { ISales } from '../types/ISales';
import { ISummable } from '../types/ISummable';

export const defaultSales: ISales = {
    hundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0,
    creditCardAmount: 0
} as ISales;

export const getSalesOrDefault = curry((defaultIfEmpty: ISales, sales: ISales) => defaultTo(defaultIfEmpty)(sales));

export const calculateTotalSales = compose<ISummable[], number[], number, string>(ConvertToCurrencyString, sum, pluck("amount"));