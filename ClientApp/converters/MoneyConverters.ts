import { multiply, sum } from 'ramda';

export const SumOneDollarBills = multiply(1);

export const SumFiveDollarBills = multiply(5);

export const SumTenDollarBills = multiply(10);

export const SumTwentyDollarBills = multiply(20);

export const SumFiftyDollarBills = multiply(50);

export const SumHundredDollarBills = multiply(100);

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