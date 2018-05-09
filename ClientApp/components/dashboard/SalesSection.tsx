import * as React from 'react';

import {
    ConvertFiveDollarBillsToAmount,
    ConvertTenDollarBillsToAmount,
    ConvertTwentyDollarBillsToAmount,
    ConvertFiftyDollarBillsToAmount,
    ConvertHundredDollarBillsToAmount,
    ConvertToCurrencyString,
    SumCashFromCurrencies
} from '../../converters/MoneyConverters';

import { ISales } from '../../types/ISales';

export interface SalesSectionProps {
    sales: ISales;
}

const calculateCashTotal = (sales: ISales) => SumCashFromCurrencies(sales.oneDollarBills, sales.fiveDollarBills, sales.tenDollarBills, sales.twentyDollarBills, sales.fiftyDollarBills, sales.hundredDollarBills);
const calculateTotalSales = (sales: ISales) => SumCashFromCurrencies(sales.oneDollarBills, sales.fiveDollarBills, sales.tenDollarBills, sales.twentyDollarBills, sales.fiftyDollarBills, sales.hundredDollarBills, sales.creditCardAmount);

export const SalesSection = (props: SalesSectionProps) => {
    return (
        <div>
            <h4>Cash register information</h4>
            <div className='panel panel-default'>
                <div className='panel-body'>
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
                                <td>{props.sales.hundredDollarBills}</td>
                                <td className='text-right'>${ConvertHundredDollarBillsToAmount(props.sales.hundredDollarBills)}</td>
                            </tr>
                            <tr>
                                <td>50's</td>
                                <td>{props.sales.fiftyDollarBills}</td>
                                <td className='text-right'>${ConvertFiftyDollarBillsToAmount(props.sales.fiftyDollarBills)}</td>
                            </tr>
                            <tr>
                                <td>20's</td>
                                <td>{props.sales.twentyDollarBills}</td>
                                <td className='text-right'>${ConvertTwentyDollarBillsToAmount(props.sales.twentyDollarBills)}</td>
                            </tr>
                            <tr>
                                <td>10's</td>
                                <td>{props.sales.tenDollarBills}</td>
                                <td className='text-right'>${ConvertTenDollarBillsToAmount(props.sales.tenDollarBills)}</td>
                            </tr>
                            <tr>
                                <td>5's</td>
                                <td>{props.sales.fiveDollarBills}</td>
                                <td className='text-right'>${ConvertFiveDollarBillsToAmount(props.sales.fiveDollarBills)}</td>
                            </tr>
                            <tr>
                                <td>1's</td>
                                <td>{props.sales.oneDollarBills}</td>
                                <td className='text-right'>${props.sales.oneDollarBills}</td>
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
                                <td></td>
                                <td className='text-right'>{ConvertToCurrencyString(props.sales.creditCardAmount)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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