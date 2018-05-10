import * as React from 'react';
import { addIndex, compose, find, findIndex, map, path, prop, propEq, sum } from 'ramda';

import { ConvertToCurrencyString } from '../../converters/MoneyConverters';

import { ISalesByHour } from '../../types/ISalesByHour';
import { IOperationHour } from '../../types/IOperationHour';
import { ICondition } from '../../types/ICondition';

export interface SalesByHourSectionProps {
    sales: ISalesByHour[];
    operationHours: IOperationHour[];
}

const indexedMap = addIndex(map);

const calculateTotalSales = (sales: ISalesByHour[]) => compose<ISalesByHour[], number[], number, string>(ConvertToCurrencyString, sum, map(s => s.amount))(sales);

const renderHourRows = (props: SalesByHourSectionProps) => {
    return indexedMap((d: IOperationHour, idx: number) => {
        const getByHourId = propEq('operationHourId', d.id);

        const sale = find(getByHourId)(props.sales);
        const saleIdx = findIndex(getByHourId)(props.sales);

        return (
            <tr key={idx}>
                <td>{prop('name', d)}</td>
                <td>{ConvertToCurrencyString(prop('amount', sale))}</td>
                <td>{prop('customers', sale)}</td>
                <td>{path(['condition', 'name'], sale)}</td>
            </tr >
        );
    }, props.operationHours);
};

export const SalesByHourSection = (props: SalesByHourSectionProps) => {
    return (
        <div>
            <h4>Sales totals categorized by product</h4>
            <div className='panel panel-default'>
                {/* <div className='panel-body'> */}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                            <th>Time slot</th>
                                <th>Amount</th>
                                <th>Customers</th>
                                <th>Weather</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderHourRows(props)}
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