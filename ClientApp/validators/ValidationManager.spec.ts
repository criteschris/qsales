import { expect } from 'chai';
import { validate, validateArray } from './ValidationManager';
import { Numeric, Required } from "../validatorRules";
import { IFieldValidator } from '../types/IFieldValidator';
import 'mocha';

describe('Validation Manager', function () {
    const requiredErrorMessage = 'is required';
    const numberErrorMessage = 'is not a number';
    const validators: IFieldValidator[] = [
        {
            fieldName: 'name',
            validators: [
                Required(requiredErrorMessage)
            ]
        },
        {
            fieldName: 'spouse',
            validators: [
                Required(requiredErrorMessage)
            ]
        },
        {
            fieldName: 'age',
            validators: [
                Numeric(numberErrorMessage)
            ]
        },
        {
            fieldName: 'children',
            validators: [
                Numeric(numberErrorMessage)
            ]
        }
    ];

    describe('validate', function () {
        const item = {
            name: 'John',
            spouse: null,
            age: 18,
            children: 'F'
        };
        const result = validate(validators, item);

        it('should validate name property has required value', function () {
            expect(result).to.not.have.property('name');
        });

        it('should validate spouse property does not have required value', function () {
            expect(result).to.have.property('spouse', requiredErrorMessage);
        });

        it('should validate age property has valid number', function () {
            expect(result).to.not.have.property('age');
        });

        it('should validate children property has invalid number', function () {
            expect(result).to.have.property('children', numberErrorMessage);
        });
    });

    describe('validateArray', function () {
        const itemArray = [
            {
                name: 'John',
                spouse: null,
                age: 18,
                children: 2
            },
            {
                name: 'Sally',
                spouse: 'John',
                age: 18,
                children: 'F'
            }
        ];
        const result = validateArray(validators, itemArray);

        it('should validate first object has required value for name', function () {
            expect(result).to.be.an('array').not.nested.property('[0].name');
        });

        it('should validate first object does not have required value for spouse', function () {
            expect(result).to.be.an('array').to.have.nested.property('[0].spouse', requiredErrorMessage);
        });

        it('should validate second object has valid number for age', function () {
            expect(result).to.be.an('array').to.not.have.nested.property('[1].age');
        });

        it('should validate second object has invalid number for children', function () {
            expect(result).to.be.an('array').to.have.nested.property('[1].children', numberErrorMessage);
        });
    });
});