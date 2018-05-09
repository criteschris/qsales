import * as React from 'react';
import { map, path, prop } from 'ramda';

import { ConvertToCurrencyString } from '../../converters/MoneyConverters';

import { ISalesByProductType } from '../../types/ISalesByProductType';

export interface SalesByProductTypeSectionProps {
    sales: ISalesByProductType[];
}

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
                <div className='panel-body'>
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
                </div>
            </div>
        </div>
    );
};