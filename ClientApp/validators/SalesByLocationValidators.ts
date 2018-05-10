import { Numeric } from "../validatorRules";
import { IFieldValidator } from '../types/IFieldValidator';

export const SalesByLocationValidators: IFieldValidator[] = [
    {
        fieldName: 'amount',
        validators: [
            Numeric('Value must be a number')
        ]
    }
];