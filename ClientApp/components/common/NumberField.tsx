import * as React from 'react';
import { curry, either, invoker, is, isNil, T, toString, unless, when } from 'ramda';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface NumberFieldProps {
    value: string | number;
    decimalPlaces?: number;
    inputClassName?: string;
    errorMessage?: string;
    onChanged: (value: number) => void;
}

const _onChanged = (props: NumberFieldProps) => (value: string) => {
    props.onChanged(Number(value));
};

const toDecimalString = invoker(1, 'toFixed');

const convertValue = (decimalPlaces: number, value: string | number) => unless<string | number, string>(either(isNil, is(String)), toDecimalString(decimalPlaces || 2))(value);

const onValidate = (value: string) => isNaN(Number(value)) ? 'Value must be a valid number represented in K USD' : '';

export default (props: NumberFieldProps) => {

    return (
        <TextField
            inputClassName={`${props.inputClassName} right-aligned`}
            value={convertValue(props.decimalPlaces, props.value)}
            onChanged={_onChanged(props)}
            validateOnLoad={false}
            errorMessage={props.errorMessage} />
    );

};