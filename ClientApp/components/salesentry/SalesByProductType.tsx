import * as React from 'react';
import { compose, defaultTo, lensPath, Lens, path, prop, replace, set, view } from 'ramda';
import { indexedMap, toString } from '../../extensions/RamdaExtensions';

import { Col, Panel, Row, Table } from 'react-bootstrap';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';
import { calculateTotalSales } from '../../extensions/SalesExtensions';

import { ISalesByProductType } from '../../types/ISalesByProductType';
import { IValidationMessage } from '../../types/IValidationMessage';

export interface SalesByProductTypeProps {
    sales: ISalesByProductType[];
    validationMessages: IValidationMessage[];
    onChanged: (sales: ISalesByProductType[]) => void;
}

const onValueChanged = (props: SalesByProductTypeProps, l: Lens) => (value: string) => {
    const updatedSales = set(l, value, props.sales);

    props.onChanged(updatedSales);
};

const renderProductRows = (props: SalesByProductTypeProps) => {
    return indexedMap((d: ISalesByProductType, idx: number) => {
        const amountLens = lensPath([idx, 'amount']);
        const rowKey = compose(replace(/[ '"]/g, ''), path(['productType', 'name']))(d);

        return (
            <tr key={rowKey}>
                <td>{path(['productType', 'name'], d)}</td>
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

export const SalesByProductType = (props: SalesByProductTypeProps) => {
    return (
        <div>
            <h4>Sales totals categorized by product</h4>
            <Panel bsStyle='default'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProductRows(props)}
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