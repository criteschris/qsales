import * as React from 'react';

import { IconButton, Button } from 'office-ui-fabric-react/lib/Button';

export const RowDeleteButton = (props: { index: number, onDelete: (index: number) => void }) => {

    return (
        <div className='list-cell list-cell-action'>
            <IconButton iconProps={{ iconName: 'Delete' }} onClick={(ev: React.MouseEvent<Button>) => props.onDelete(props.index)} />
        </div>
    );
}