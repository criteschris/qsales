import * as React from 'react';

import { RowDeleteButton } from './RowDeleteButton';
import { EditableListCell } from './EditableListCell';
import { IFacet } from '../../types/IFacet';

export interface EditableListRowProps {
    facet: IFacet;
    index: number;
    onChanged: (facet: IFacet, index: number) => void;
    onDelete: (index: number) => void;
}

export class EditableListRow extends React.PureComponent<EditableListRowProps, {}> {
    public render() {

        return (
            <div className='list-row'>
                <EditableListCell facet={this.props.facet} index={this.props.index} onChanged={this.props.onChanged} />
                <RowDeleteButton index={this.props.index} onDelete={this.props.onDelete} />
            </div>
        );
    }
}