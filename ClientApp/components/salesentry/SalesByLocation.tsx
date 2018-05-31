import * as React from 'react';
import { compose, defaultTo, lensPath, Lens, path, prop, replace, set, view } from 'ramda';
import { indexedMap, toString } from '../../extensions/RamdaExtensions';

import { Col, Panel, Row, Table } from 'react-bootstrap';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';
import { calculateTotalSales } from '../../extensions/SalesExtensions';

import { ISalesByLocation } from '../../types/ISalesByLocation';
import { IValidationMessage } from '../../types/IValidationMessage';

export interface SalesByLocationProps {
    sales: ISalesByLocation[];
    validationMessages: IValidationMessage[];
    onChanged: (sales: ISalesByLocation[]) => void;
}

const onValueChanged = (props: SalesByLocationProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const renderLocationRows = (props: SalesByLocationProps) => {
    return indexedMap((d: ISalesByLocation, idx: number) => {
        const amountLens = lensPath([idx, 'amount']);
        const rowKey = compose(replace(/[ '"]/g, ''), path(['location', 'name']))(d);

        return (
            <tr key={rowKey}>
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
            <Panel bsStyle='default'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderLocationRows(props)}
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