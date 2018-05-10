import * as React from 'react';
import { addIndex, compose, lensPath, Lens, map, path, prop, set, sum, view } from 'ramda';

import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import { ConvertToCurrencyString } from '../../converters/MoneyConverters';

import { ISalesByProductType } from '../../types/ISalesByProductType';
import { IValidationMessage } from '../../types/IValidationMessage';

export interface SalesByProductTypeProps {
    sales: ISalesByProductType[];
    validationMessages: IValidationMessage[];
    onChanged: (sales: ISalesByProductType[]) => void;
}

const indexedMap = addIndex(map);

const calculateTotalSales = (sales: ISalesByProductType[]) => compose<ISalesByProductType[], number[], number, string>(ConvertToCurrencyString, sum, map(s => s.amount))(sales);

const onValueChanged = (props: SalesByProductTypeProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const renderProductRows = (props: SalesByProductTypeProps) => {
    return indexedMap((d: ISalesByProductType, idx: number) => {
        const amountLens = lensPath([idx, 'amount']);

        return (
            <tr key={idx}>
                <td>{path(['productType', 'name'], d)}</td>
                <td>
                    <TextField
                        prefix='$'
                        value={d.amount.toString()}
                        onChanged={onValueChanged(props, amountLens)}
                        errorMessage={view(amountLens, props.validationMessages)}
                    />
                </td>
            </tr>
        );
    }, props.sales);
};

export const SalesByProductType = (props: SalesByProductTypeProps) => {
    return (
        <div>
            <h4>Sales totals categorized by product</h4>
            <div className='panel panel-default'>
                {/* <div className='panel-body'> */}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProductRows(props)}
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