var chai = require('chai');
var should = chai.should();
var converters = require('../ClientApp/converters/MoneyConverters.ts');

describe('Money Converter', function() {
    it('should sum hundred dollar bills', function(){
        var result = converters.SumHundredDollarBills(2);

        result.should.eq(200);
    });
    it('should sum fifty dollar bills');
});