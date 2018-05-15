import * as React from 'react';
import { compose, map, path, prop, sum } from 'ramda';

import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';

import { ISalesByProductType } from '../../types/ISalesByProductType';

export interface SalesByProductTypeSectionProps {
    sales: ISalesByProductType[];
}

const calculateTotalSales = (sales: ISalesByProductType[]) => compose<ISalesByProductType[], number[], number, string>(ConvertToCurrencyString, sum, map(s => s.amount))(sales);

const renderProductRows = (data) => {
    return map((d: ISalesByProductType) => {
        return (
            <tr>
                <td>{path(['productType', 'name'], d)}</td>
                <td className='text-right'>{ConvertToCurrencyString(prop('amount', d))}</td>
            </tr>
        );
    }, data);
};

export const SalesByProductTypeSection = (props: SalesByProductTypeSectionProps) => {
    return (
        <div>
            <h4>Sales totals categorized by product</h4>
            <div className='panel panel-default'>
                {/* <div className='panel-body'> */}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className='text-right'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProductRows(props.sales)}
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