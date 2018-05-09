import * as React from 'react';
import { render } from 'react-dom';
import * as moment from 'moment';

import { Container } from './Container';
import { Sales } from '../components/salesentry/Sales';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

import { ISales } from '../types/ISales';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface SalesEntryProps {

}

export interface SalesEntryState {
    sales: ISales;
    currentEntryDate: Date;
}

export class SalesEntry extends React.Component<SalesEntryProps, SalesEntryState> {
    constructor(props: SalesEntryProps) {
        super(props);

        this.state = {
            currentEntryDate: moment().add(-1, 'days').toDate(),
            sales: {} as ISales
        };
    }

    @autobind
    private _onEntryDateChanged(date: Date | null | undefined) {
        this.setState({
            currentEntryDate: date
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
                            onSelectDate={this._onEntryDateChanged}
                        />
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-xs-12'>
                        <Sales sales={this.state.sales} />
                    </div>
                </div>
            </Container>
        );
    }
}

render(<SalesEntry />, document.getElementById('react-app'));