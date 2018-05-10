import * as React from 'react';
import { assoc, compose, curry, defaultTo, is, lens, Lens, multiply, prop, set, toString, unless, view } from 'ramda';

import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import {
    SumOneDollarBills,
    SumFiveDollarBills,
    SumTenDollarBills,
    SumTwentyDollarBills,
    SumFiftyDollarBills,
    SumHundredDollarBills,
    ConvertToCurrencyString,
    SumCashFromCurrencies
} from '../../converters/MoneyConverters';

import { ISales } from '../../types/ISales';
import { IValidationMessage } from '../../types/IValidationMessage';

export interface SalesProps {
    sales: ISales;
    validationMessage: IValidationMessage;
    onChanged: (sales: ISales) => void;
}

const hundredDollarBillsLens = lens(prop('hundredDollarBills'), assoc('hundredDollarBills'));
const fiftyDollarBillsLens = lens(prop('fiftyDollarBills'), assoc('fiftyDollarBills'));
const twentyDollarBillsLens = lens(prop('twentyDollarBills'), assoc('twentyDollarBills'));
const tenDollarBillsLens = lens(prop('tenDollarBills'), assoc('tenDollarBills'));
const fiveDollarBillsLens = lens(prop('fiveDollarBills'), assoc('fiveDollarBills'));
const oneDollarBillsLens = lens(prop('oneDollarBills'), assoc('oneDollarBills'));
const creditCardLens = lens(prop('creditCardAmount'), assoc('creditCardAmount'));

const calculateCashTotal = (sales: ISales) => SumCashFromCurrencies(sales.oneDollarBills, sales.fiveDollarBills, sales.tenDollarBills, sales.twentyDollarBills, sales.fiftyDollarBills, sales.hundredDollarBills);
const calculateTotalSales = (sales: ISales) => SumCashFromCurrencies(sales.oneDollarBills, sales.fiveDollarBills, sales.tenDollarBills, sales.twentyDollarBills, sales.fiftyDollarBills, sales.hundredDollarBills, sales.creditCardAmount);
const sumHundreds = (sales: ISales) => compose(ConvertToCurrencyString, SumHundredDollarBills, defaultTo(0), view(hundredDollarBillsLens))(sales);
const sumFifties = (sales: ISales) => compose(ConvertToCurrencyString, SumFiftyDollarBills, defaultTo(0), view(fiftyDollarBillsLens))(sales);
const sumTwenties = (sales: ISales) => compose(ConvertToCurrencyString, SumTwentyDollarBills, defaultTo(0), view(twentyDollarBillsLens))(sales);
const sumTens = (sales: ISales) => compose(ConvertToCurrencyString, SumTenDollarBills, defaultTo(0), view(tenDollarBillsLens))(sales);
const sumFives = (sales: ISales) => compose(ConvertToCurrencyString, SumFiveDollarBills, defaultTo(0), view(fiveDollarBillsLens))(sales);
const sumOnes = (sales: ISales) => compose(ConvertToCurrencyString, SumOneDollarBills, defaultTo(0), view(oneDollarBillsLens))(sales);
const sumCreditCards = (sales: ISales) => compose(ConvertToCurrencyString, multiply(1), defaultTo(0), view(creditCardLens))(sales);

const convertNumericValueToString = curry((l: Lens, obj: ISales) => compose(unless(is(String), toString), defaultTo(0), view(l))(obj));

const onValueChanged = (props: SalesProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const buildPropsForCurrencyField = (l: Lens, props: SalesProps): ITextFieldProps => {
    return {
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
                                <th>Count</th>
                                <th className='text-right'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>100's</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(hundredDollarBillsLens, props)} />
                                </td>
                                <td className='text-right'>{sumHundreds(props.sales)}</td>
                            </tr>
                            <tr>
                                <td>50's</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(fiftyDollarBillsLens, props)} />
                                </td>
                                <td className='text-right'>{sumFifties(props.sales)}</td>
                            </tr>
                            <tr>
                                <td>20's</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(twentyDollarBillsLens, props)} />
                                </td>
                                <td className='text-right'>{sumTwenties(props.sales)}</td>
                            </tr>
                            <tr>
                                <td>10's</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(tenDollarBillsLens, props)} />
                                </td>
                                <td className='text-right'>{sumTens(props.sales)}</td>
                            </tr>
                            <tr>
                                <td>5's</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(fiveDollarBillsLens, props)} />
                                </td>
                                <td className='text-right'>{sumFives(props.sales)}</td>
                            </tr>
                            <tr>
                                <td>1's</td>
                                <td>
                                    <TextField {...buildPropsForCurrencyField(oneDollarBillsLens, props)} />
                                </td>
                                <td className='text-right'>{sumOnes(props.sales)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Total Cash:</strong>
                                </td>
                                <td></td>
                                <td className='text-right'>
                                    <strong>{calculateCashTotal(props.sales)}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Credit</td>
                                <td>
                                    <TextField prefix="$" {...buildPropsForCurrencyField(creditCardLens, props)} />
                                </td>
                                <td className='text-right'>{sumCreditCards(props.sales)}</td>
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