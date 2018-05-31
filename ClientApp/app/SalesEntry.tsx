import * as React from 'react';
import { render } from 'react-dom';
import { compose, curry, defaultTo, map, path, prop } from 'ramda';

import { Grid, Row, Col } from 'react-bootstrap';
import { Container } from './Container';
import { SalesEntryHeader } from '../components/salesentry/SalesEntryHeader';
import { Sales } from '../components/salesentry/Sales';
import { SalesByLocation } from '../components/salesentry/SalesByLocation';
import { SalesByProductType } from '../components/salesentry/SalesByProductType';
import { SalesByHour } from '../components/salesentry/SalesByHour';

import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { getSalesForDateByBar } from '../api/SalesApi';
import { validate, validateArray } from '../validators/ValidationManager';
import { SalesValidators, SalesByHourValidators, SalesByLocationValidators, SalesByProductTypeValidators } from '../validators';
import { getSalesOrDefault, defaultSales } from '../extensions/SalesExtensions';
import { getSalesByProductTypeOrDefault, defaultSalesByProductType } from '../extensions/SalesByProductExtensions';
import { getSalesByLocationOrDefault, defaultSalesByLocation } from '../extensions/SalesByLocationExtensions';
import { getSalesByHoursOrDefault, defaultSalesByHour } from '../extensions/SalesByHourExtensions';
import { getUrlParameter } from '../utilities/UriUtilities';

import { ISales } from '../types/ISales';
import { ISalesByLocation } from '../types/ISalesByLocation';
import { ISalesByProductType } from '../types/ISalesByProductType';
import { ISalesByHour } from '../types/ISalesByHour';
import { ICondition } from '../types/ICondition';
import { ILocation } from '../types/ILocation';
import { IEmployee } from '../types/IEmployee';
import { IOrganization } from '../types/IOrganization';
import { IPerformer } from '../types/IPerformer';
import { IEvent } from '../types/IEvent';
import { IProductType } from '../types/IProductType';
import { IValidationMessage } from '../types/IValidationMessage';
import { ISalesEntryInitialState, ISalesEntrySalesData } from '../types/ISalesEntryInitialState';
import { IOperationHour } from '../types/IOperationHour';

import { mapFacetToIDropdownOption } from '../utilities/FacetMapper';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface SalesEntryProps {

}

export interface SalesEntryState {
    sales: ISales;
    salesByLocations: ISalesByLocation[];
    salesByProductTypes: ISalesByProductType[];
    salesByHours: ISalesByHour[];
    currentEntryDate: Date;
    hourOpenedKey: number;
    hourClosedKey: number;
    salesValidationMessages: IValidationMessage;
    salesByLocationValidationMessages: IValidationMessage[];
    salesByProductTypeValidationMessages: IValidationMessage[];
    salesByHourValidationMessages: IValidationMessage[];
}

export class SalesEntry extends React.Component<SalesEntryProps, SalesEntryState> {
    private employees: IEmployee[];
    private events: IEvent[];
    private operationHours: IOperationHour[];
    private conditionsOptions: IDropdownOption[];
    private locations: ILocation[];
    private organizations: IOrganization[];
    private performers: IPerformer[];
    private productTypes: IProductType[];
    private operationHourOptions: IDropdownOption[];

    constructor(props: SalesEntryProps) {
        super(props);

        const initialState: ISalesEntryInitialState = (window as any).initialState;

        this.operationHourOptions = mapFacetToIDropdownOption(initialState.operationHours);
        this.employees = initialState.employees;
        this.events = initialState.events;
        this.operationHours = initialState.operationHours;
        this.locations = initialState.locations;
        this.organizations = initialState.organizations;
        this.performers = initialState.performers;
        this.productTypes = initialState.productTypes;
        this.conditionsOptions = mapFacetToIDropdownOption(initialState.conditions);

        this.state = {
            currentEntryDate: new Date(),
            hourOpenedKey: 0,
            hourClosedKey: 0,
            sales: getSalesOrDefault(defaultSales, initialState.sales),
            salesByHours: getSalesByHoursOrDefault(initialState.operationHours, initialState.sales),
            salesByLocations: getSalesByLocationOrDefault(initialState.locations, initialState.sales),
            salesByProductTypes: getSalesByProductTypeOrDefault(initialState.productTypes, initialState.sales),
            salesValidationMessages: {},
            salesByLocationValidationMessages: [],
            salesByProductTypeValidationMessages: [],
            salesByHourValidationMessages: []
        };
    }

    @autobind
    private _getSalesForEntryDate(entryDate: Date): Promise<void> {
        const barId = getUrlParameter('b', window.location.search);

        return getSalesForDateByBar(barId, entryDate).then((salesData: ISales) => {
            this.setState({
                sales: getSalesOrDefault(defaultSales, salesData),
                salesByHours: getSalesByHoursOrDefault(this.operationHours, salesData),
                salesByLocations: getSalesByLocationOrDefault(this.locations, salesData),
                salesByProductTypes: getSalesByProductTypeOrDefault(this.productTypes, salesData)
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

    @autobind
    private _onHourOpenedChanged(option: IDropdownOption) {
        this.setState({
            hourOpenedKey: option.key as number
        });
    }

    @autobind
    private _onHourClosedChanged(option: IDropdownOption) {
        this.setState({
            hourClosedKey: option.key as number
        });
    }

    @autobind
    private _onSalesChanged(sales: ISales) {
        this.setState({
            sales,
            salesValidationMessages: validate(SalesValidators, sales)
        });
    }

    @autobind
    private _onSalesByLocationChanged(salesByLocations: ISalesByLocation[]) {
        this.setState({
            salesByLocations,
            salesByLocationValidationMessages: validateArray(SalesByLocationValidators, salesByLocations)
        });
    }

    @autobind
    private _onSalesByProductTypeChanged(salesByProductTypes: ISalesByProductType[]) {
        this.setState({
            salesByProductTypes,
            salesByProductTypeValidationMessages: validateArray(SalesByProductTypeValidators, salesByProductTypes)
        });
    }

    @autobind
    private _onSalesByHourChanged(salesByHours: ISalesByHour[]) {
        this.setState({
            salesByHours,
            salesByHourValidationMessages: validateArray(SalesByHourValidators, salesByHours)
        });
    }

    public render() {
        return (
            <Container>
                <Grid fluid>
                    <Row>
                        <Col lg={3} md={6} sm={9} xs={12}>
                            <SalesEntryHeader
                                entryDate={this.state.currentEntryDate}
                                onDateSelected={this._onEntryDateChanged}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Sales
                                sales={this.state.sales}
                                onChanged={this._onSalesChanged}
                                validationMessage={this.state.salesValidationMessages}
                            />
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <SalesByProductType
                                sales={this.state.salesByProductTypes}
                                onChanged={this._onSalesByProductTypeChanged}
                                validationMessages={this.state.salesByProductTypeValidationMessages}
                            />
                            <SalesByLocation
                                sales={this.state.salesByLocations}
                                onChanged={this._onSalesByLocationChanged}
                                validationMessages={this.state.salesByLocationValidationMessages}
                            />
                        </Col>
                        <Col lg={6} xs={12}>
                            <SalesByHour
                                sales={this.state.salesByHours}
                                operationHours={this.operationHours}
                                conditions={this.conditionsOptions}
                                onChanged={this._onSalesByHourChanged}
                                validationMessages={this.state.salesByHourValidationMessages}
                            />
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

render(<SalesEntry />, document.getElementById('react-app'));