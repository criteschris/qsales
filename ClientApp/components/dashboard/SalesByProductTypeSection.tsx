import * as React from 'react';
import { compose, map, path, prop, sum } from 'ramda';

import { Col, Panel, Row, Table } from 'react-bootstrap';
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
            <Panel bsStyle='default'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className='text-right'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProductRows(props.sales)}
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