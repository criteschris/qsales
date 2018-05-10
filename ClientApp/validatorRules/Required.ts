import { always, compose, curry, either, ifElse, isEmpty, isNil, not, prop } from 'ramda';

export const Required = curry(<T>(errorMessage: string, fieldName: string, item: T) => compose(ifElse(either(isEmpty, isNil), always(errorMessage), always('')), prop(fieldName))(item));