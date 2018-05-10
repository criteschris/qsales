import * as React from 'react';

import { EditableListRow } from './EditableListRow';
import { IFacet } from '../../types/IFacet';

export interface EditableListProps {
    facets: IFacet[];
    onChanged: (facet: IFacet, index: number) => void;
    onDelete: (index: number) => void;
}

export const EditableList = (props: EditableListProps) => {
    return (
        <div className='list-table'>
            {props.facets.map((f: IFacet, idx: number) => (<EditableListRow facet={f} index={idx} onChanged={props.onChanged} onDelete={props.onDelete} />))}
        </div>
    );
}