import { expect } from 'chai';
import { Required } from './Required';
import 'mocha';

describe('Required validator', function () {
    describe('Required', function () {
        const item = {
            name: 'John',
            age: 18,
            children: null
        };
        const errorMessage = 'value is required';

        it('should validate not null value with empty message', function () {
            const result = Required(errorMessage, 'age', item);

            expect(result).eq('');
        });

        it('should validate null value with error message', function () {
            const result = Required(errorMessage, 'children', item);

            expect(result).eq(errorMessage);
        });
    });
});