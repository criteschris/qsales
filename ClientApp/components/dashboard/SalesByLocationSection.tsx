import * as React from 'react';
import { compose, map, path, prop, sum } from 'ramda';

import { ConvertToCurrencyString } from '../../converters/MoneyConverters';

import { ISalesByLocation } from '../../types/ISalesByLocation';

export interface SalesByLocationSectionProps {
    sales: ISalesByLocation[];
}

const calculateTotalSales = (sales: ISalesByLocation[]) => compose<ISalesByLocation[], number[], number, string>(ConvertToCurrencyString, sum, map(s => s.amount))(sales);

const renderLocationRows = (data) => {
    return map((d: ISalesByLocation) => {
        return (
            <tr>
                <td>{path(['location', 'name'], d)}</td>
                <td className='text-right'>{ConvertToCurrencyString(prop('amount', d))}</td>
            </tr>
        );
    }, data);
};

export const SalesByLocationSection = (props: SalesByLocationSectionProps) => {
    return (
        <div>
            <h4>Sales totals categorized by location</h4>
            <div className='panel panel-default'>
                {/* <div className='panel-body'> */}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th className='text-right'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLocationRows(props.sales)}
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