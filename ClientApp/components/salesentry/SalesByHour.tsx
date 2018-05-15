import * as React from 'react';
import { addIndex, compose, defaultTo, find, findIndex, lensPath, Lens, map, path, prop, propEq, set, sum, toString, view } from 'ramda';

import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';

import { ISalesByHour } from '../../types/ISalesByHour';
import { IValidationMessage } from '../../types/IValidationMessage';
import { IOperationHour } from '../../types/IOperationHour';
import { ICondition } from '../../types/ICondition';

export interface SalesByHourProps {
    sales: ISalesByHour[];
    operationHours: IOperationHour[];
    conditions: ICondition[];
    validationMessages: IValidationMessage[];
    onChanged: (sales: ISalesByHour[]) => void;
}

const indexedMap = addIndex(map);

const calculateTotalSales = (sales: ISalesByHour[]) => compose<ISalesByHour[], number[], number, string>(ConvertToCurrencyString, sum, map(s => s.amount))(sales);

const onValueChanged = (props: SalesByHourProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const onConditionChanged = (props: SalesByHourProps, l: Lens) => (option: IDropdownOption) => {
    const updatedSales = set(l, option.key, props.sales);

    props.onChanged(updatedSales);
}

const renderHourRows = (props: SalesByHourProps) => {
    return indexedMap((d: IOperationHour, idx: number) => {
        const getByHourId = propEq('operationHourId', d.id);
        const conditionOptions = map(c => ({ key: c.id, text: c.name }), props.conditions);

        const sale = find(getByHourId)(props.sales);
        const saleIdx = findIndex(getByHourId)(props.sales);
        const amountLens = lensPath([saleIdx, 'amount']);
        const conditionIdLens = lensPath([saleIdx, 'conditionId']);
        const customersLens = lensPath([saleIdx, 'customers']);

        return (
            <tr key={idx}>
                <td>{prop('name', d)}</td>
                <td>
                    <TextField
                        prefix='$'
                        value={compose(toString, defaultTo(0), prop('amount'))(sale)}
                        onChanged={onValueChanged(props, amountLens)}
                        errorMessage={view(amountLens, props.validationMessages)}
                    />
                </td>
                <td>
                    <TextField
                        value={compose(toString, defaultTo(0), prop('customers'))(sale)}
                        onChanged={onValueChanged(props, customersLens)}
                        errorMessage={view(customersLens, props.validationMessages)}
                    />
                </td>
                <td>
                    <Dropdown
                        selectedKey={prop('conditionId', sale)}
                        options={conditionOptions}
                        onChanged={onConditionChanged(props, conditionIdLens)}
                    />
                </td>
            </tr >
        );
    }, props.operationHours);
};

export const SalesByHour = (props: SalesByHourProps) => {
    return (
        <div>
            <h4>Sales totals by hour</h4>
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