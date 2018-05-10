import { Numeric } from "../validatorRules";
import { IFieldValidator } from '../types/IFieldValidator';

export const SalesByHourValidators: IFieldValidator[] = [
    {
        fieldName: 'amount',
        validators: [
            Numeric('Value must be a number')
        ]
    },
    {
        fieldName: 'customers',
        validators: [
            Numeric('Value must be a number')
        ]
    }
];