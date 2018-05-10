import * as React from 'react';
import { assoc, isEmpty, prop } from 'ramda';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

import { IFacet } from '../../types/IFacet';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface EditableListCellProps {
    facet: IFacet;
    index: number;
    onChanged: (facet: IFacet, index: number) => void;
}

export const EditableListCell = (props: EditableListCellProps) => {

    const onValidateTextField = (value: string): string => {
        if (isEmpty(value)) {
            return 'You must supply a value';
        }

        return '';
    }

    const onChanged = (name: string): void => {
        props.onChanged(assoc('name', name, props.facet), props.index);
    }

    return (
        <div className='list-cell'>
            <TextField
                placeholder='Type in a value'
                value={prop('name', props.facet)}
                underlined
                onChanged={onChanged}
                onGetErrorMessage={onValidateTextField}
            />
        </div>
    );
};