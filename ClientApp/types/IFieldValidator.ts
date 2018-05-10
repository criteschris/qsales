import { CurriedFunction2 } from "ramda";
import { IValidationMessage } from "./IValidationMessage";

export interface IFieldValidator {
    fieldName: string;
    validators: CurriedFunction2<string, any, IValidationMessage>[];
}