import * as React from 'react';
import { render } from 'react-dom';
import { compose, curry, defaultTo, map, path, prop } from 'ramda';

import { Container } from './Container';
import { Sales } from '../components/salesentry/Sales';
import { SalesByLocation } from '../components/salesentry/SalesByLocation';
import { SalesByProductType } from '../components/salesentry/SalesByProductType';
import { SalesByHour } from '../components/salesentry/SalesByHour';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { validate, validateArray } from '../validators/ValidationManager';
import { SalesValidators, SalesByHourValidators, SalesByLocationValidators, SalesByProductTypeValidators } from '../validators';
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

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface SalesEntryProps {

}

export interface SalesEntryState {
    sales: ISales;
    salesByLocations: ISalesByLocation[];
    salesByProductTypes: ISalesByProductType[];
    salesByHours: ISalesByHour[];
    employees: IEmployee[];
    events: IEvent[];
    operationHours: IOperationHour[];
    conditions: ICondition[];
    locations: ILocation[];
    organizations: IOrganization[];
    performers: IPerformer[];
    productTypes: IProductType[];
    currentEntryDate: Date;
    hourOpenedKey: number;
    hourClosedKey: number;
    salesValidationMessages: IValidationMessage;
    salesByLocationValidationMessages: IValidationMessage[];
    salesByProductTypeValidationMessages: IValidationMessage[];
    salesByHourValidationMessages: IValidationMessage[];
}

export class SalesEntry extends React.Component<SalesEntryProps, SalesEntryState> {
    private defaultSales: ISales = {
        hundreds: 0,
        fifties: 0,
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        creditCardAmount: 0
    } as ISales;
    private defaultSalesByLocation = (locations: ILocation[]) => map(l => (
        {
            locationId: l.id,
            amount: 0,
            location: l
        } as ISalesByLocation
    ), locations);
    private defaultSalesByProductType = (productTypes: IProductType[]) => map(p => (
        {
            productTypeId: p.id,
            amount: 0,
            productType: p
        } as ISalesByProductType
    ), productTypes);
    private defaultSalesByHour = (operationHours: IOperationHour[]) => map(h => (
        {
            operationHourId: h.id,
            amount: 0,
            customers: 0
        } as ISalesByHour
    ), operationHours);
    private operationHourOptions: IDropdownOption[];
    private getSalesOrDefault = defaultTo(this.defaultSales);
    private getSalesByHoursOrDefault = curry((operationHours: IOperationHour[], sales: ISales) => compose<ISales, ISalesByHour[], ISalesByHour[]>(defaultTo(this.defaultSalesByHour(operationHours)), prop('salesByHours'))(sales));
    private getSalesByLocationOrDefault = curry((locations: ILocation[], sales: ISales) => compose<ISales, ISalesByLocation[], ISalesByLocation[]>(defaultTo(this.defaultSalesByLocation(locations)), prop('salesByLocations'))(sales));
    private getSalesByProductTypeOrDefault = curry((productTypes: IProductType[], sales: ISales) => compose<ISales, ISalesByProductType[], ISalesByProductType[]>(defaultTo(this.defaultSalesByProductType(productTypes)), prop('salesByProductTypes'))(sales));

    constructor(props: SalesEntryProps) {
        super(props);

        const initialState: ISalesEntryInitialState = (window as any).initialState;

        this.operationHourOptions = map(h => ({ key: h.id, text: h.name }), initialState.operationHours);

        this.state = {
            currentEntryDate: new Date(),
            hourOpenedKey: 0,
            hourClosedKey: 0,
            employees: initialState.employees,
            events: initialState.events,
            operationHours: initialState.operationHours,
            locations: initialState.locations,
            organizations: initialState.organizations,
            performers: initialState.performers,
            productTypes: initialState.productTypes,
            conditions: initialState.conditions,
            sales: this.getSalesOrDefault(initialState.sales),
            salesByHours: this.getSalesByHoursOrDefault(initialState.operationHours, initialState.sales),
            salesByLocations: this.getSalesByLocationOrDefault(initialState.locations, initialState.sales),
            salesByProductTypes: this.getSalesByProductTypeOrDefault(initialState.productTypes, initialState.sales),
            salesValidationMessages: {},
            salesByLocationValidationMessages: [],
            salesByProductTypeValidationMessages: [],
            salesByHourValidationMessages: []
        };
    }

    @autobind
    private _getSalesForEntryDate(entryDate: Date): Promise<void> {
        const barId = getUrlParameter('b', window.location.search);

        return fetch(`/sales/getsales?b=${barId}&entryDate=${entryDate.toISOString()}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }

            return {};
        }).then((salesData: ISales) => {
            this.setState({
                sales: this.getSalesOrDefault(salesData),
                salesByHours: this.getSalesByHoursOrDefault(this.state.operationHours, salesData),
                salesByLocations: this.getSalesByLocationOrDefault(this.state.locations, salesData),
                salesByProductTypes: this.getSalesByProductTypeOrDefault(this.state.productTypes, salesData)
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
    private _onHourOpenedChanged(option: IDropdownOption){
        this.setState({
            hourOpenedKey: option.key as number
        });
    }

    @autobind
    private _onHourClosedChanged(option: IDropdownOption){
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
                <h2>Sales Data</h2>
                <p>Select a date to see sales data for that specific day</p>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-sm-9 col-xs-12'>
                        <DatePicker
                            value={this.state.currentEntryDate}
                            maxDate={new Date()}
                            onSelectDate={this._onEntryDateChanged}
                        />
                        {/* <div className='row'>
                            <div className='col-xs-6'>
                                <Dropdown
                                    label='Hour opened'
                                    selectedKey={this.state.hourOpenedKey}
                                    options={this.operationHourOptions}
                                    onChanged={this._onHourOpenedChanged}
                                />
                            </div>
                            <div className='col-xs-6'>
                                <Dropdown
                                    label='Hour closed'
                                    selectedKey={this.state.hourClosedKey}
                                    options={this.operationHourOptions}
                                    onChanged={this._onHourClosedChanged}
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-xs-12'>
                        <Sales
                            sales={this.state.sales}
                            onChanged={this._onSalesChanged}
                            validationMessage={this.state.salesValidationMessages}
                        />
                    </div>
                    <div className='col-lg-3 col-md-6 col-xs-12'>
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
                    </div>
                    <div className='col-lg-6 col-xs-12'>
                        <SalesByHour
                            sales={this.state.salesByHours}
                            operationHours={this.state.operationHours}
                            conditions={this.state.conditions}
                            onChanged={this._onSalesByHourChanged}
                            validationMessages={this.state.salesByHourValidationMessages}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

render(<SalesEntry />, document.getElementById('react-app'));