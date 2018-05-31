import * as React from 'react';
import { addIndex, compose, find, findIndex, map, path, prop, propEq, sum } from 'ramda';

import { Col, Panel, Row, Table } from 'react-bootstrap';
import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';

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