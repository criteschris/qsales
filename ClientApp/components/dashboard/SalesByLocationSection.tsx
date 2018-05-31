import * as React from 'react';
import { compose, map, path, prop, sum } from 'ramda';

import { Col, Panel, Row, Table } from 'react-bootstrap';
import { ConvertToCurrencyString } from '../../utilities/CurrencyMath';

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
            <Panel bsStyle='default'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th className='text-right'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLocationRows(props.sales)}
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