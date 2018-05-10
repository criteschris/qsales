import { Numeric } from "../validatorRules";
import { IFieldValidator } from '../types/IFieldValidator';

export const SalesValidators: IFieldValidator[] = [
    {
        fieldName: 'hundredDollarBills',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'fiftyDollarBills',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'twentyDollarBills',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'tenDollarBills',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'fiveDollarBills',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'oneDollarBills',
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