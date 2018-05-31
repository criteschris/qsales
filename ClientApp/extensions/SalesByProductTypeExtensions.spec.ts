import { expect } from 'chai';
import { getSalesByProductTypeOrDefault } from './SalesByProductExtensions';
import 'mocha';
import { IProductType } from '../types/IProductType';
import { ISales } from '../types/ISales';
import { ISalesByProductType } from '../types/ISalesByProductType';

describe('SalesByProductType Extensions', function () {
    describe('getSalesByProductTypeOrDefault', function () {
        const productTypes: IProductType[] = [
            {
                id: 1,
                name: 'Product 1'
            },
            {
                id: 2,
                name: 'Product 2'
            }
        ];

        const salesByProductTypes: ISalesByProductType[] = [
            {
                productTypeId: 1,
                amount: 0,
                productType: {
                    id: 1,
                    name: 'Product 1'
                }
            } as ISalesByProductType,
            {
                productTypeId: 2,
                amount: 0,
                productType: {
                    id: 2,
                    name: 'Product 2'
                }
            } as ISalesByProductType
        ];

        it('should return default when null or empty', function () {
            const result = getSalesByProductTypeOrDefault(productTypes, { salesByProductTypes: [] } as ISales);

            expect(result).to.be.an('array').to.deep.eq(salesByProductTypes);
        });

        it('should return sales', function () {
            const result = getSalesByProductTypeOrDefault(productTypes, { salesByProductTypes } as ISales);

            expect(result).eq(salesByProductTypes);
        });
    });
});