import { addIndex, always, assoc, compose, CurriedFunction2, curry, either, head, ifElse, isEmpty, isNil, juxt, map, prop, reduce, reject, unless } from 'ramda';
import { IFieldValidator } from '../types/IFieldValidator';
import { IValidationMessage } from '../types/IValidationMessage';

const indexedMap = addIndex(map);

const executeValidators = curry(<S>(obj: S, fieldName: string, validators: CurriedFunction2<any, any, string>[]) => {
    let message = compose<S, string[], string[], string>(head, reject(isEmpty), juxt(map(v => v(fieldName), validators)))(obj);

    return message;
});

const addProperty = curry(<S>(fieldName: string, obj: S, value: any) => assoc(fieldName, value, obj));

const validatorReducer = curry(<S>(obj: S, acc: IValidationMessage, cur: IFieldValidator) => {
    return ifElse(either(isEmpty, isNil), always(acc), addProperty(cur.fieldName, acc))(executeValidators(obj, cur.fieldName, cur.validators));
});

export const validate = curry(<S>(validators: IFieldValidator[], obj: S) => reduce<IFieldValidator, IValidationMessage>(validatorReducer(obj), {} as IValidationMessage, validators));

export const validateArray = curry(<S>(validators: IFieldValidator[], arr: S[]) => compose<S[], IValidationMessage[], IValidationMessage[]>(reject(isNil), map(validate(validators)))(arr));