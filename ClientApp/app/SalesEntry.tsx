import * as React from 'react';
import { render } from 'react-dom';
import { map } from 'ramda';

import { Container } from './Container';
import { Sales } from '../components/salesentry/Sales';
import { SalesByLocation } from '../components/salesentry/SalesByLocation';
import { SalesByProductType } from '../components/salesentry/SalesByProductType';
import { SalesByHour } from '../components/salesentry/SalesByHour';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { validate, validateArray } from '../validators/ValidationManager';
import { SalesValidators, SalesByHourValidators, SalesByLocationValidators, SalesByProductTypeValidators } from '../validators';

import { ISales } from '../types/ISales';
import { ISalesByLocation } from '../types/ISalesByLocation';
import { ISalesByProductType } from '../types/ISalesByProductType';
import { ISalesByHour } from '../types/ISalesByHour';
import { ICondition } from '../types/ICondition';
import { IValidationMessage } from '../types/IValidationMessage';
import { ISalesEntryInitialState } from '../types/ISalesEntryInitialState';
import { IOperationHour } from '../types/IOperationHour';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface SalesEntryProps {

}

export interface SalesEntryState {
    sales: ISales;
    salesByLocation: ISalesByLocation[];
    salesByProductType: ISalesByProductType[];
    salesByHour: ISalesByHour[];
    operationHours: IOperationHour[];
    conditions: ICondition[];
    currentEntryDate: Date;
    hourOpenedKey: number;
    hourClosedKey: number;
    salesValidationMessages: IValidationMessage;
    salesByLocationValidationMessages: IValidationMessage[];
    salesByProductTypeValidationMessages: IValidationMessage[];
    salesByHourValidationMessages: IValidationMessage[];
}

export class SalesEntry extends React.Component<SalesEntryProps, SalesEntryState> {
    private operationHourOptions: IDropdownOption[];

    constructor(props: SalesEntryProps) {
        super(props);

        const initialState: ISalesEntryInitialState = (window as any).initialState;

        this.operationHourOptions = map(h => ({ key: h.id, text: h.name }), initialState.operationHours);

        this.state = {
            currentEntryDate: new Date(),
            hourOpenedKey: 0,
            hourClosedKey: 0,
            operationHours: initialState.operationHours,
            conditions: initialState.conditions,
            sales: {
                hundredDollarBills: 0,
                fiftyDollarBills: 0,
                twentyDollarBills: 0,
                tenDollarBills: 0,
                fiveDollarBills: 0,
                oneDollarBills: 0,
                creditCardAmount: 0
            } as ISales,
            salesByLocation: map(l => (
                {
                    locationId: l.id,
                    amount: 0,
                    location: l
                } as ISalesByLocation
            ), initialState.locations),
            salesByProductType: map(p => (
                {
                    productTypeId: p.id,
                    amount: 0,
                    productType: p
                } as ISalesByProductType
            ), initialState.productTypes),
            salesByHour: map(h => (
                {
                    operationHourId: h.id,
                    amount: 0,
                    customers: 0
                } as ISalesByHour
            ), initialState.operationHours),
            salesValidationMessages: {},
            salesByLocationValidationMessages: [],
            salesByProductTypeValidationMessages: [],
            salesByHourValidationMessages: []
        };
    }

    @autobind
    private _onEntryDateChanged(date: Date | null | undefined) {
        this.setState({
            currentEntryDate: date
        });
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
    private _onSalesByLocationChanged(salesByLocation: ISalesByLocation[]) {
        this.setState({
            salesByLocation,
            salesByLocationValidationMessages: validateArray(SalesByLocationValidators, salesByLocation)
        });
    }

    @autobind
    private _onSalesByProductTypeChanged(salesByProductType: ISalesByProductType[]) {
        this.setState({
            salesByProductType,
            salesByProductTypeValidationMessages: validateArray(SalesByProductTypeValidators, salesByProductType)
        });
    }

    @autobind
    private _onSalesByHourChanged(salesByHour: ISalesByHour[]) {
        this.setState({
            salesByHour,
            salesByHourValidationMessages: validateArray(SalesByHourValidators, salesByHour)
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
                            sales={this.state.salesByProductType}
                            onChanged={this._onSalesByProductTypeChanged}
                            validationMessages={this.state.salesByProductTypeValidationMessages}
                        />
                        <SalesByLocation
                            sales={this.state.salesByLocation}
                            onChanged={this._onSalesByLocationChanged}
                            validationMessages={this.state.salesByLocationValidationMessages}
                        />
                    </div>
                    <div className='col-lg-6 col-xs-12'>
                        <SalesByHour
                            sales={this.state.salesByHour}
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