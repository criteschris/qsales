import * as React from 'react';
import { render } from 'react-dom';
import { compose, defaultTo, path, prop } from 'ramda';

import { Container } from './Container';
import { Grid, Row, Col } from 'react-bootstrap';
import { SalesSection } from '../components/dashboard/SalesSection';
import { SalesByProductTypeSection } from '../components/dashboard/SalesByProductTypeSection';
import { SalesByLocationSection } from '../components/dashboard/SalesByLocationSection';
import { SalesByHourSection } from '../components/dashboard/SalesByHourSection';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

import { ISales } from '../types/ISales';
import { ISalesByHour } from '../types/ISalesByHour';
import { ISalesByLocation } from '../types/ISalesByLocation';
import { ISalesByProductType } from '../types/ISalesByProductType';
import { IDashboardInitialState } from '../types/IDashboardInitialState';
import { IOperationHour } from '../types/IOperationHour';

import { getSalesForDateByBar } from '../api/SalesApi';
import { getSalesOrDefault } from '../extensions/SalesExtensions';
import { getSalesByProductTypeOrDefault } from '../extensions/SalesByProductExtensions';
import { getSalesByLocationOrDefault } from '../extensions/SalesByLocationExtensions';
import { getSalesByHoursOrDefault } from '../extensions/SalesByHourExtensions';
import { addDays } from 'office-ui-fabric-react/lib/Utilities/dateMath/DateMath';
import { getUrlParameter } from '../utilities/UriUtilities';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


export interface DashboardProps {

}

export interface DashboardState {
    currentEntryDate: Date;
    sales: ISales;
    salesByHours: ISalesByHour[];
    salesByLocations: ISalesByLocation[];
    salesByProductTypes: ISalesByProductType[];
    operationHours: IOperationHour[];
}

export class Dashboard extends React.Component<DashboardProps, DashboardState>{
    constructor(props: DashboardProps) {
        super(props);

        const initialState: IDashboardInitialState = (window as any).initialState;

        this.state = {
            currentEntryDate: addDays(new Date(), -1),
            sales: getSalesOrDefault({} as ISales, initialState.sales),
            salesByHours: getSalesByHoursOrDefault([], initialState.sales),
            salesByLocations: getSalesByLocationOrDefault([], initialState.sales),
            salesByProductTypes: getSalesByProductTypeOrDefault([], initialState.sales),
            operationHours: initialState.operationHours
        };
    }

    @autobind
    private _getSalesForEntryDate(entryDate: Date): Promise<void> {
        const barId = getUrlParameter('b', window.location.search);

        return getSalesForDateByBar(barId, entryDate).then((salesData: ISales) => {
            this.setState({
                sales: getSalesOrDefault({} as ISales, salesData),
                salesByHours: getSalesByHoursOrDefault([], salesData),
                salesByLocations: getSalesByLocationOrDefault([], salesData),
                salesByProductTypes: getSalesByProductTypeOrDefault([], salesData)
            });
        });
    }

    @autobind
    private _onEntryDateChanged(date: Date | null | undefined) {
        this.setState({
            currentEntryDate: date
        });

        this._getSalesForEntryDate(date);
    }

    public render() {
        return (
            <Container>
                <h2>Sales Data</h2>
                <p>Select a date to see sales data for that specific day</p>
                <Grid fluid>
                    <Row>
                        <Col lg={3} md={6} sm={9} xs={12}>
                            <DatePicker
                                value={this.state.currentEntryDate}
                                maxDate={addDays(new Date(), -1)}
                                onSelectDate={this._onEntryDateChanged}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <SalesSection
                                sales={this.state.sales}
                            />
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <SalesByProductTypeSection
                                sales={this.state.salesByProductTypes}
                            />
                            <SalesByLocationSection
                                sales={this.state.salesByLocations}
                            />
                        </Col>
                        <Col lg={6} xs={12}>
                            <SalesByHourSection
                                sales={this.state.salesByHours}
                                operationHours={this.state.operationHours}
                            />
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

render(<Dashboard />, document.getElementById('react-app'));