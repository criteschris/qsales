import { Numeric } from "../validatorRules";
import { IFieldValidator } from '../types/IFieldValidator';

export const SalesValidators: IFieldValidator[] = [
    {
        fieldName: 'hundreds',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'fifties',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'twenties',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'tens',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'fives',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'ones',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'creditCardAmount',
        validators: [
            Numeric('Value must be a number')
        ]
    }
];