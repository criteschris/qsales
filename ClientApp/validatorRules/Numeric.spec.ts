import { expect } from 'chai';
import { Numeric } from './Numeric';
import 'mocha';

describe('Numeric validator', function () {
    describe('Numeric', function () {
        const item = {
            name: 'John',
            age: 18,
            children: '2 and one half'
        };
        const errorMessage = 'is not a number';

        it('should validate number with empty message', function () {
            const result = Numeric(errorMessage, 'age', item);

            expect(result).eq('');
        });

        it('should validate string with error message', function () {
            const result = Numeric(errorMessage, 'children', item);

            expect(result).eq(errorMessage);
        });
    });
});