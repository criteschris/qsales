import { addIndex, invoker, map } from 'ramda';

export const indexedMap = addIndex(map);

export const toString = invoker(0, "toString");