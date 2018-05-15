import * as React from 'react';
import { render } from 'react-dom';
import { compose, defaultTo, path, prop } from 'ramda';

import { Container } from './Container';
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
    private getSalesOrDefault = compose<ISales, ISales>(defaultTo({} as ISales));
    private getSalesByHoursOrDefault = compose<ISales, ISalesByHour[], ISalesByHour[]>(defaultTo([]), prop('salesByHours'));
    private getSalesByLocationOrDefault = compose<ISales, ISalesByLocation[], ISalesByLocation[]>(defaultTo([]), prop('salesByLocations'));
    private getSalesByProductTypeOrDefault = compose<ISales, ISalesByProductType[], ISalesByProductType[]>(defaultTo([]), prop('salesByProductTypes'));

    constructor(props: DashboardProps) {
        super(props);

        const initialState: IDashboardInitialState = (window as any).initialState;

        this.state = {
            currentEntryDate: addDays(new Date(), -1),
            sales: this.getSalesOrDefault(initialState.sales),
            salesByHours: this.getSalesByHoursOrDefault(initialState.sales),
            salesByLocations: this.getSalesByLocationOrDefault(initialState.sales),
            salesByProductTypes: this.getSalesByProductTypeOrDefault(initialState.sales),
            operationHours: initialState.operationHours
        };
    }

    @autobind
    private _getSalesForEntryDate(entryDate: Date): Promise<void> {
        const barId = getUrlParameter('b', window.location.search);

        return fetch(`/home/getsales?b=${barId}&entryDate=${entryDate.toISOString()}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }

            return {};
        }).then((salesData: ISales) => {
            this.setState({
                sales: this.getSalesOrDefault(salesData),
                salesByHours: this.getSalesByHoursOrDefault(salesData),
                salesByLocations: this.getSalesByLocationOrDefault(salesData),
                salesByProductTypes: this.getSalesByProductTypeOrDefault(salesData)
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
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-sm-9 col-xs-12'>
                        <DatePicker
                            value={this.state.currentEntryDate}
                            maxDate={addDays(new Date(), -1)}
                            onSelectDate={this._onEntryDateChanged}
                        />
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-xs-12'>
                        <SalesSection
                            sales={this.state.sales}
                        />
                    </div>
                    <div className='col-lg-3 col-md-6 col-xs-12'>
                        <SalesByProductTypeSection
                            sales={this.state.salesByProductTypes}
                        />
                        <SalesByLocationSection
                            sales={this.state.salesByLocations}
                        />
                    </div>
                    <div className='col-lg-6 col-xs-12'>
                        <SalesByHourSection
                            sales={this.state.salesByHours}
                            operationHours={this.state.operationHours}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

render(<Dashboard />, document.getElementById('react-app'));