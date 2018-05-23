import { compose, defaultTo, multiply, sum } from 'ramda';

export const SumOneDollarBills = compose(multiply(1), defaultTo(0));

export const SumFiveDollarBills = compose(multiply(5), defaultTo(0));

export const SumTenDollarBills = compose(multiply(10), defaultTo(0));

export const SumTwentyDollarBills = compose(multiply(20), defaultTo(0));

export const SumFiftyDollarBills = compose(multiply(50), defaultTo(0));

export const SumHundredDollarBills = compose(multiply(100), defaultTo(0));

export const ConvertToCurrencyString = (value: number = 0) => '$' + value.toFixed(2);

export const SumCashFromCurrencies = (ones: number = 0, fives: number = 0, tens: number = 0, twenties: number = 0, fifties: number = 0, hundreds: number = 0, creditCards: number = 0) => {
    return ConvertToCurrencyString(sum([
        ones,
        SumFiveDollarBills(fives),
        SumTenDollarBills(tens),
        SumTwentyDollarBills(twenties),
        SumFiftyDollarBills(fifties),
        SumHundredDollarBills(hundreds),
        creditCards
    ]));
}