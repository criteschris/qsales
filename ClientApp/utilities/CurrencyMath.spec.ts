import { expect } from 'chai';
import {
    ConvertToCurrencyString,
    SumOneDollarBills,
    SumFiveDollarBills,
    SumTenDollarBills,
    SumTwentyDollarBills,
    SumFiftyDollarBills,
    SumHundredDollarBills,
    SumCashFromCurrencies
} from './CurrencyMath';
import 'mocha';

describe('Currency Math', function () {
    describe('SumHundredDollarBills', function () {
        it('expect sum of 2 hundreds to equal 200', function () {
            var result = SumHundredDollarBills(2);

            expect(result).to.eq(200);
        });

        it('expect sum of null to equal 0', function () {
            var result = SumHundredDollarBills(null);

            expect(result).to.eq(0);
        });

        it('expect sum of undefined to equal 0', function () {
            var result = SumHundredDollarBills(undefined);

            expect(result).to.eq(0);
        });
    });

    describe('SumFiftyDollarBills', function () {
        it('expect sum of 2 fifties to equal 100', function () {
            var result = SumFiftyDollarBills(2);

            expect(result).to.eq(100);
        });

        it('expect sum of null to equal 0', function () {
            var result = SumFiftyDollarBills(null);

            expect(result).to.eq(0);
        });

        it('expect sum of undefined to equal 0', function () {
            var result = SumFiftyDollarBills(undefined);

            expect(result).to.eq(0);
        });
    });

    describe('SumTwentyDollarBills', function () {
        it('expect sum of 2 twenties to equal 40', function () {
            var result = SumTwentyDollarBills(2);

            expect(result).to.eq(40);
        });

        it('expect sum of null to equal 0', function () {
            var result = SumTwentyDollarBills(null);

            expect(result).to.eq(0);
        });

        it('expect sum of undefined to equal 0', function () {
            var result = SumTwentyDollarBills(undefined);

            expect(result).to.eq(0);
        });
    });

    describe('SumTenDollarBills', function () {
        it('expect sum of 2 tens to equal 20', function () {
            var result = SumTenDollarBills(2);

            expect(result).to.eq(20);
        });

        it('expect sum of null to equal 0', function () {
            var result = SumTenDollarBills(null);

            expect(result).to.eq(0);
        });

        it('expect sum of undefined to equal 0', function () {
            var result = SumTenDollarBills(undefined);

            expect(result).to.eq(0);
        });
    });

    describe('SumFiveDollarBills', function () {
        it('expect sum of 2 fives to equal 10', function () {
            var result = SumFiveDollarBills(2);

            expect(result).to.eq(10);
        });

        it('expect sum of null to equal 0', function () {
            var result = SumFiveDollarBills(null);

            expect(result).to.eq(0);
        });

        it('expect sum of undefined to equal 0', function () {
            var result = SumFiveDollarBills(undefined);

            expect(result).to.eq(0);
        });
    });

    describe('SumOneDollarBills', function () {
        it('expect sum of 2 ones to equal 2', function () {
            var result = SumOneDollarBills(2);

            expect(result).to.eq(2);
        });

        it('expect sum of null to equal 0', function () {
            var result = SumOneDollarBills(null);

            expect(result).to.eq(0);
        });

        it('expect sum of undefined to equal 0', function () {
            var result = SumOneDollarBills(undefined);

            expect(result).to.eq(0);
        });
    });

    describe('SumOneDollarBills', function () {
        it('should convert number 5 to currency string $5.00', function () {
            var result = ConvertToCurrencyString(5);

            expect(result).to.eq('$5.00');
        });
    });
});