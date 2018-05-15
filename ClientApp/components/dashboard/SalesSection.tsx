import * as React from 'react';
import { prop } from 'ramda';

import {
    /* SumFives,
    SumTens,
    Sumtwenties,
    Sumfifties,
    SumHundreds, */
    ConvertToCurrencyString,
    SumCashFromCurrencies
} from '../../utilities/CurrencyMath';

import { ISales } from '../../types/ISales';

export interface SalesSectionProps {
    sales: ISales;
}

const calculateCashTotal = (sales: ISales) => SumCashFromCurrencies(sales.ones, sales.fives, sales.tens, sales.twenties, sales.fifties, sales.hundreds);
const calculateTotalSales = (sales: ISales) => SumCashFromCurrencies(sales.ones, sales.fives, sales.tens, sales.twenties, sales.fifties, sales.hundreds, sales.creditCardAmount);

export const SalesSection = (props: SalesSectionProps) => {
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
                                <td className='text-right'>{ConvertToCurrencyString(prop('hundreds', props.sales))}</td>
                            </tr>
                            <tr>
                                <td>50's</td>
                                <td className='text-right'>{ConvertToCurrencyString(prop('fifties', props.sales))}</td>
                            </tr>
                            <tr>
                                <td>20's</td>
                                <td className='text-right'>{ConvertToCurrencyString(prop('twenties', props.sales))}</td>
                            </tr>
                            <tr>
                                <td>10's</td>
                                <td className='text-right'>{ConvertToCurrencyString(prop('tens', props.sales))}</td>
                            </tr>
                            <tr>
                                <td>5's</td>
                                <td className='text-right'>{ConvertToCurrencyString(prop('fives', props.sales))}</td>
                            </tr>
                            <tr>
                                <td>1's</td>
                                <td className='text-right'>{ConvertToCurrencyString(prop('ones', props.sales))}</td>
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
                                <td className='text-right'>{ConvertToCurrencyString(props.sales.creditCardAmount)}</td>
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