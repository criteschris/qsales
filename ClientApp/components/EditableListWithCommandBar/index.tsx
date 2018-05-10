import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { isEmpty } from 'ramda';

import { AddSaveCommandBar } from '../AddSaveCommandBar';
import { EditableList } from '../EditableList';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { IconButton, Button } from 'office-ui-fabric-react/lib/Button';

import { IFacet } from '../../types/IFacet';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';


export interface EditableListWithCommandBarProps {
    facets: IFacet[];
    isSaving: boolean;
    onAdd: () => void;
    onChanged: (facet: IFacet, index: number) => void;
    onSave: () => void;
    onDelete: (index: number) => void;
}

export const EditableListWithCommandBar = (props: EditableListWithCommandBarProps) => {

    return (
        <div>
            <AddSaveCommandBar
                isSaving={props.isSaving}
                onAdd={props.onAdd}
                onSave={props.onSave}
            />
            <EditableList
                facets={props.facets}
                onChanged={props.onChanged}
                onDelete={props.onDelete}
            />
        </div>
    );
}