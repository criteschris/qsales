import * as React from 'react';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
//import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface SalesEntryHeaderProps {
    entryDate: Date;
    onDateSelected: (date: Date | null | undefined) => void;
}

/* Add to render if reintroducing the fields below
<div className='row'>
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
                        </div> */

export const SalesEntryHeader = (props: SalesEntryHeaderProps) => {
    return (
        <div>
            <h2>Sales Data</h2>
            <p>Select a date to see sales data for that specific day</p>
            <DatePicker
                value={props.entryDate}
                maxDate={new Date()}
                onSelectDate={props.onDateSelected}
            />
        </div>
    );
};