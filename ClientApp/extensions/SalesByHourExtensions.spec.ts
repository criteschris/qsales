import { expect } from 'chai';
import { getSalesByHoursOrDefault } from './SalesByHourExtensions';
import 'mocha';
import { IOperationHour } from '../types/IOperationHour';
import { ISales } from '../types/ISales';
import { ISalesByHour } from '../types/ISalesByHour';

describe('SalesByHour Extensions', function () {
    describe('getSalesByHoursOrDefault', function () {
        const operationsHours: IOperationHour[] = [
            {
                id: 1,
                name: '6 am'
            },
            {
                id: 2,
                name: '7 am'
            },
            {
                id: 3,
                name: '8 am'
            }
        ];

        const salesByHours: ISalesByHour[] = [
            {
                operationHourId: 1,
                amount: 0,
                customers: 0
            } as ISalesByHour,
            {
                operationHourId: 2,
                amount: 0,
                customers: 0
            } as ISalesByHour,
            {
                operationHourId: 3,
                amount: 0,
                customers: 0
            } as ISalesByHour
        ];

        it('should return default when null or empty', function () {
            const result = getSalesByHoursOrDefault(operationsHours, { salesByHours: [] } as ISales);

            expect(result).to.be.an('array').to.deep.eq(salesByHours);
        });

        it('should return sales', function () {
            const result = getSalesByHoursOrDefault(operationsHours, { salesByHours } as ISales);

            expect(result).eq(salesByHours);
        });
    });
});