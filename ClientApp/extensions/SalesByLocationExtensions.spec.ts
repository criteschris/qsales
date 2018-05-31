import { expect } from 'chai';
import { getSalesByLocationOrDefault } from './SalesByLocationExtensions';
import 'mocha';
import { ILocation } from '../types/ILocation';
import { ISales } from '../types/ISales';
import { ISalesByLocation } from '../types/ISalesByLocation';

describe('SalesByLocation Extensions', function () {
    describe('getSalesByLocationOrDefault', function () {
        const locations: ILocation[] = [
            {
                id: 1,
                name: 'Bar 1'
            },
            {
                id: 2,
                name: 'Bar 2'
            }
        ];

        const salesByLocations: ISalesByLocation[] = [
            {
                locationId: 1,
                amount: 0,
                location: {
                    id: 1,
                    name: 'Bar 1'
                }
            } as ISalesByLocation,
            {
                locationId: 2,
                amount: 0,
                location: {
                    id: 2,
                    name: 'Bar 2'
                }
            } as ISalesByLocation
        ];

        it('should return default when null or empty', function () {
            const result = getSalesByLocationOrDefault(locations, { salesByLocations: [] } as ISales);

            expect(result).to.be.an('array').to.deep.eq(salesByLocations);
        });

        it('should return sales', function () {
            const result = getSalesByLocationOrDefault(locations, { salesByLocations } as ISales);

            expect(result).eq(salesByLocations);
        });
    });
});