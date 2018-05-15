import * as React from 'react';
import { assoc, compose, curry, defaultTo, is, lens, Lens, multiply, prop, set, toString, unless, view } from 'ramda';

import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import {
    ConvertToCurrencyString,
    SumCashFromCurrencies
} from '../../utilities/CurrencyMath';

import { ISales } from '../../types/ISales';
import { IValidationMessage } from '../../types/IValidationMessage';

export interface SalesProps {
    sales: ISales;
    validationMessage: IValidationMessage;
    onChanged: (sales: ISales) => void;
}

const hundredsLens = lens(prop('hundreds'), assoc('hundreds'));
const fiftiesLens = lens(prop('fifties'), assoc('fifties'));
const twentiesLens = lens(prop('twenties'), assoc('twenties'));
const tensLens = lens(prop('tens'), assoc('tens'));
const fivesLens = lens(prop('fives'), assoc('fives'));
const onesLens = lens(prop('ones'), assoc('ones'));
const creditCardLens = lens(prop('creditCardAmount'), assoc('creditCardAmount'));

const calculateCashTotal = (sales: ISales) => SumCashFromCurrencies(sales.ones, sales.fives, sales.tens, sales.twenties, sales.fifties, sales.hundreds);
const calculateTotalSales = (sales: ISales) => SumCashFromCurrencies(sales.ones, sales.fives, sales.tens, sales.twenties, sales.fifties, sales.hundreds, sales.creditCardAmount);
const sumCreditCards = (sales: ISales) => compose(ConvertToCurrencyString, multiply(1), defaultTo(0), view(creditCardLens))(sales);

const convertNumericValueToString = curry((l: Lens, obj: ISales) => compose(unless(is(String), toString), defaultTo(0), view(l))(obj));

const onValueChanged = (props: SalesProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const buildPropsForCurrencyField = (l: Lens, props: SalesProps): ITextFieldProps => {
    return {
        prefix: '$',
        value: convertNumericValueToString(l)(props.sales),
        onChanged: onValueChanged(props, l),
        errorMessage: view(l, props.validationMessage)
    };
}

export const Sales = (props: SalesProps) => {
    return (
        <div>
            <h4>Cash register information</h4>
            <div className='panel panel-default'>
                {/* <div className='panel-body'> */}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Bills</th>
                                <th className='text-right'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>100's</td>
                                <td>
                                    <TextField suffix='.00' {...buildPropsForCurrencyField(hundredsLens, props)} />
                                </td>
                            </tr>
                            <tr>
                                <td>50's</td>
                                <td>
                                    <TextField suffix='.00' {...buildPropsForCurrencyField(fiftiesLens, props)} />
                                </td>
                            </tr>
                            <tr>
                                <td>20's</td>
                                <td>
                                    <TextField suffix='.00' {...buildPropsForCurrencyField(twentiesLens, props)} />
                                </td>
                            </tr>
                            <tr>
                                <td>10's</td>
                                <td>
                                    <TextField suffix='.00' {...buildPropsForCurrencyField(tensLens, props)} />
                                </td>
                            </tr>
                            <tr>
                                <td>5's</td>
                                <td>
                                    <TextField suffix='.00' {...buildPropsForCurrencyField(fivesLens, props)} />
                                </td>
                            </tr>
                            <tr>
                                <td>1's</td>
                                <td>
                                    <TextField suffix='.00' {...buildPropsForCurrencyField(onesLens, props)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Total Cash:</strong>
                                </td>
                                <td className='text-right'>
                                    <strong>{calculateCashTotal(props.sales)}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Credit</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(creditCardLens, props)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                {/* </div> */}
                <div className='panel-footer'>
                    <div className='row'>
                        <div className='col-xs-6'>
                            <strong>Total Sales: </strong>
                        </div>
                        <div className='col-xs-6 text-right'>
                            <strong>{calculateTotalSales(props.sales)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};