import * as React from 'react';
import { compose, concat, defaultTo, find, findIndex, lensPath, Lens, map, nth, prop, propEq, replace, set, view } from 'ramda';
import { indexedMap, toString } from '../../extensions/RamdaExtensions';

import { Col, Panel, Row, Table } from 'react-bootstrap';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';
import { calculateTotalSales } from '../../extensions/SalesExtensions';

import { ISalesByHour } from '../../types/ISalesByHour';
import { IValidationMessage } from '../../types/IValidationMessage';
import { IOperationHour } from '../../types/IOperationHour';
import { ICondition } from '../../types/ICondition';

export interface SalesByHourProps {
    sales: ISalesByHour[];
    operationHours: IOperationHour[];
    conditions: IDropdownOption[];
    validationMessages: IValidationMessage[];
    onChanged: (sales: ISalesByHour[]) => void;
}

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
        const saleIdx = findIndex(getByHourId)(props.sales);
        const amountLens = lensPath([saleIdx, 'amount']);
        const conditionIdLens = lensPath([saleIdx, 'conditionId']);
        const customersLens = lensPath([saleIdx, 'customers']);
        const rowKey = compose(replace(/[ '"]/g, ''), prop('name'))(d);

        return (
            <tr key={rowKey}>
                <td>{prop('name', d)}</td>
                <td>
                    <TextField
                        prefix='$'
                        value={compose(toString, defaultTo(0), view(amountLens))(props.sales)}
                        onChanged={onValueChanged(props, amountLens)}
                        errorMessage={view(amountLens, props.validationMessages)}
                    />
                </td>
                <td>
                    <TextField
                        value={compose(toString, defaultTo(0), view(customersLens))(props.sales)}
                        onChanged={onValueChanged(props, customersLens)}
                        errorMessage={view(customersLens, props.validationMessages)}
                    />
                </td>
                <td>
                    <Dropdown
                        selectedKey={view(conditionIdLens, props.sales)}
                        options={props.conditions}
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
            <Panel bsStyle='default'>
                <Table striped>
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
                </Table>
                <Panel.Footer>
                    <Row>
                        <Col xs={6}>
                            <strong>Total Sales: </strong>
                        </Col>
                        <Col xs={6} className='text-right'>
                            <strong>{calculateTotalSales(props.sales)}</strong>
                        </Col>
                    </Row>
                </Panel.Footer>
            </Panel>
        </div>
    );
};