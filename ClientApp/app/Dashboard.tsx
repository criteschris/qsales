import * as React from 'react';
import { render } from 'react-dom';
import * as moment from 'moment';

import { Container } from './Container';
import { SalesSection } from '../components/dashboard/SalesSection';
import { SalesByProductTypeSection } from '../components/dashboard/SalesByProductTypeSection';
import { SalesByLocationSection } from '../components/dashboard/SalesByLocationSection';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

import { ISales } from '../types/ISales';
import { ISalesByHour } from '../types/ISalesByHour';
import { ISalesByLocation } from '../types/ISalesByLocation';
import { ISalesByProductType } from '../types/ISalesByProductType';
import { IDashboardInitialState } from '../types/IDashboardInitialState';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface DashboardProps {

}

export interface DashboardState {
    currentEntryDate: Date;
    sales: ISales;
    salesByHour: ISalesByHour[];
    salesByLocation: ISalesByLocation[];
    salesByProductType: ISalesByProductType[];
}

export class Dashboard extends React.Component<DashboardProps, DashboardState>{
    constructor(props: DashboardProps) {
        super(props);

        const initialState: IDashboardInitialState = (window as any).initialState;

        this.state = {
            currentEntryDate: moment().add(-1, 'days').toDate(),
            sales: initialState.sales,
            salesByHour: initialState.salesByHour,
            salesByLocation: initialState.salesByLocation,
            salesByProductType: initialState.salesByProductType
        };
    }

    @autobind
    private _getSalesForEntryDate(entryDate: Date): Promise<void> {
        return fetch('/home/getsales?entryDate=' + moment(entryDate).toISOString(), {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }

            return {};
        }).then((salesData: IDashboardInitialState) => {
            this.setState({
                sales: salesData.sales,
                salesByHour: salesData.salesByHour,
                salesByLocation: salesData.salesByLocation,
                salesByProductType: salesData.salesByProductType
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
                            sales={this.state.salesByProductType}
                        />
                        <SalesByLocationSection
                            sales={this.state.salesByLocation}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

render(<Dashboard />, document.getElementById('react-app'));