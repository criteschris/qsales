import * as React from 'react';
import { render } from 'react-dom';
import { compose, defaultTo, path, prop } from 'ramda';

import { Container } from './Container';
import { SalesSection } from '../components/dashboard/SalesSection';
import { SalesByProductTypeSection } from '../components/dashboard/SalesByProductTypeSection';
import { SalesByLocationSection } from '../components/dashboard/SalesByLocationSection';
import { SalesByHourSection } from '../components/dashboard/SalesByHourSection';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton, Button } from 'office-ui-fabric-react/lib/Button';

import { ISales } from '../types/ISales';
import { IOperationHour } from '../types/IOperationHour';

import { addDays } from 'office-ui-fabric-react/lib/Utilities/dateMath/DateMath';
import { getUrlParameter } from '../utilities/UriUtilities';
import { mapFacetToIDropdownOption } from '../utilities/FacetMapper';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFacet } from '../types/IFacet';
import { SumCashFromCurrencies } from '../utilities/CurrencyMath';
import { ISalesReport } from '../types/ISalesReport';

export interface ReportProps {

}

export interface ReportPageInitialState {
    events: IFacet[];
    organizations: IFacet[];
    performers: IFacet[];
}

export interface ReportState {
    dayOfWeekId: number;
    eventId: number;
    organizationId: number;
    performerId: number;
    eventOptions: IDropdownOption[];
    organizationOptions: IDropdownOption[];
    performerOptions: IDropdownOption[];
    currentEntryDate: Date;
    sales: ISalesReport[];
}

export class Report extends React.Component<ReportProps, ReportState> {
    private daysOfWeek: IDropdownOption[] = [
        {
            key: 1,
            text: 'Sunday'
        },
        {
            key: 2,
            text: 'Monday'
        },
        {
            key: 3,
            text: 'Tuesday'
        },
        {
            key: 4,
            text: 'Wednesday'
        },
        {
            key: 5,
            text: 'Thursday'
        },
        {
            key: 6,
            text: 'Friday'
        },
        {
            key: 7,
            text: 'Saturday'
        }
    ];

    constructor(props: ReportProps) {
        super(props);

        const initialState: ReportPageInitialState = (window as any).initialState;

        this.state = {
            dayOfWeekId: 0,
            eventId: 0,
            organizationId: 0,
            performerId: 0,
            eventOptions: mapFacetToIDropdownOption(initialState.events),
            organizationOptions: mapFacetToIDropdownOption(initialState.organizations),
            performerOptions: mapFacetToIDropdownOption(initialState.performers),
            currentEntryDate: new Date(),
            sales: []
        };
    }

    private calculateTotalSales = (sales: ISales) => SumCashFromCurrencies(sales.ones, sales.fives, sales.tens, sales.twenties, sales.fifties, sales.hundreds, sales.creditCardAmount);

    

    //private getSalesOrDefault = compose<ReportState, ISales, ISales>(defaultTo({} as ISales), prop('sales'));

    @autobind
    private _onSearchClicked(ev: React.MouseEvent<Button>) {
        this._getSalesReport();
    }

    @autobind
    private _dayOfWeekChanged(option: IDropdownOption) {
        this.setState({
            dayOfWeekId: option.key as number
        });
    }

    @autobind
    private _eventChanged(option: IDropdownOption) {
        this.setState({
            eventId: option.key as number
        });
    }

    @autobind
    private _organizationChanged(option: IDropdownOption) {
        this.setState({
            organizationId: option.key as number
        });
    }

    @autobind
    private _performerChanged(option: IDropdownOption) {
        this.setState({
            performerId: option.key as number
        });
    }

    @autobind
    private _getSalesReport(): Promise<void> {
        const barId = getUrlParameter('b', window.location.search);

        return fetch(`/home/GetSalesReportData?b=${barId}&dw=${this.state.dayOfWeekId}&e=${this.state.eventId}&o=${this.state.organizationId}&p=${this.state.performerId}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }

            return {};
        }).then((salesData: ISalesReport[]) => {
            this.setState({
                sales: salesData
            });
        });
    }

    public render() {
        return (
            <Container>
                <h2>Reporting</h2>
                <p>Use this page to compare sales data between days.</p>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-sm-9 col-xs-12'>
                        <Dropdown
                            label='Days of Week'
                            selectedKey={this.state.dayOfWeekId}
                            options={this.daysOfWeek}
                            onChanged={this._dayOfWeekChanged}
                        />
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-9 col-xs-12'>
                        <Dropdown
                            label='Events'
                            placeHolder='Choose an event'
                            selectedKey={this.state.eventId}
                            options={this.state.eventOptions}
                            onChanged={this._eventChanged}
                        />
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-9 col-xs-12'>
                        <Dropdown
                            label='Organizations'
                            selectedKey={this.state.organizationId}
                            options={this.state.organizationOptions}
                            onChanged={this._organizationChanged}
                        />
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-9 col-xs-12'>
                        <Dropdown
                            label='Performers'
                            selectedKey={this.state.performerId}
                            options={this.state.performerOptions}
                            onChanged={this._performerChanged}
                        />
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-xs-12'>
                        <PrimaryButton
                            text='Get Sales'
                            onClick={this._onSearchClicked}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Entry Date</th>
                                    <th>Total Sales</th>
                                    <th>Total Customers</th>
                                    <th>Total Personel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sales.map(s => (
                                    <tr>
                                        <td>{(new Date(s.entryDate.toString())).toDateString()}</td>
                                        <td>${s.totalSales}</td>
                                        <td>{s.totalCustomers}</td>
                                        <td>{s.totalPersonel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        );
    }
}

render(<Report />, document.getElementById('react-app'));