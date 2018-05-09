import { multiply, sum } from 'ramda';

export const ConvertFiveDollarBillsToAmount = multiply(5);

export const ConvertTenDollarBillsToAmount = multiply(10);

export const ConvertTwentyDollarBillsToAmount = multiply(20);

export const ConvertFiftyDollarBillsToAmount = multiply(50);

export const ConvertHundredDollarBillsToAmount = multiply(100);

export const ConvertToCurrencyString = (value: number = 0) => '$' + value.toFixed(2);

export const SumCashFromCurrencies = (ones: number = 0, fives: number = 0, tens: number = 0, twenties: number = 0, fifties: number = 0, hundreds: number = 0, creditCards: number = 0) => {
    return ConvertToCurrencyString(sum([
        ones,
        ConvertFiveDollarBillsToAmount(fives),
        ConvertTenDollarBillsToAmount(tens),
        ConvertTwentyDollarBillsToAmount(twenties),
        ConvertFiftyDollarBillsToAmount(fifties),
        ConvertHundredDollarBillsToAmount(hundreds),
        creditCards
    ]));
}