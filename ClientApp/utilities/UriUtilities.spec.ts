import { expect } from 'chai';
import { getUrlParameter } from './UriUtilities';
import 'mocha';

describe('UriUtilities', function () {
    describe('getUrlParameter', function () {
        it('should get param from url', function () {
            const search = "?id=1&name=John";
            const result = getUrlParameter('id', search);

            expect(result).eq('1');
        });
    });
});