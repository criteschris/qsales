import * as React from 'react';
import { addIndex, compose, defaultTo, lensPath, Lens, map, path, prop, set, sum, toString, view } from 'ramda';

import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';

import { ISalesByLocation } from '../../types/ISalesByLocation';
import { IValidationMessage } from '../../types/IValidationMessage';

export interface SalesByLocationProps {
    sales: ISalesByLocation[];
    validationMessages: IValidationMessage[];
    onChanged: (sales: ISalesByLocation[]) => void;
}

const indexedMap = addIndex(map);

const calculateTotalSales = (sales: ISalesByLocation[]) => compose<ISalesByLocation[], number[], number, string>(ConvertToCurrencyString, sum, map(s => s.amount))(sales);

const onValueChanged = (props: SalesByLocationProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const renderLocationRows = (props: SalesByLocationProps) => {
    return indexedMap((d: ISalesByLocation, idx: number) => {
        const amountLens = lensPath([idx, 'amount']);

        return (
            <tr key={idx}>
                <td>{path(['location', 'name'], d)}</td>
                <td>
                    <TextField
                        prefix='$'
                        value={compose(toString, defaultTo(0), prop('amount'))(d)}
                        onChanged={onValueChanged(props, amountLens)}
                        errorMessage={view(amountLens, props.validationMessages)}
                    />
                </td>
            </tr>
        );
    }, props.sales);
};

export const SalesByLocation = (props: SalesByLocationProps) => {
    return (
        <div>
            <h4>Sales totals categorized by location</h4>
            <div className='panel panel-default'>
                {/* <div className='panel-body'> */}
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLocationRows(props)}
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