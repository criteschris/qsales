import { always, compose, curry, ifElse, prop } from 'ramda';

const isNotNumeric = (value: string | number) => value != Number(value);

export const Numeric = curry(<T>(errorMessage: string, fieldName: string, item: T) => compose(ifElse(isNotNumeric, always(errorMessage), always('')), prop(fieldName))(item));