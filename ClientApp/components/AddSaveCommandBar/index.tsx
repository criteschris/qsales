import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface AddSaveCommandBarProps {
    isSaving: boolean,
    onAdd: () => void,
    onSave: () => void
}

const onRenderSaveButton = (props: AddSaveCommandBarProps) => (item: IContextualMenuItem): JSX.Element => {
    let icon = <Icon style={{ padding: '0 4px', fontSize: '16px', color: '#106ebe' }} iconName='Save' />;

    if (props.isSaving) {
        icon = <Spinner style={{ padding: '0 4px' }} size={SpinnerSize.small} />;
    }

    return <CommandBarButton
        disabled={props.isSaving}
        onClick={(ev: React.MouseEvent<HTMLButtonElement>) => props.onSave()}>
        {icon}
        <span style={{ padding: '0 4px' }}>Save Changes</span>
    </CommandBarButton>;
};

const buildCommands = (props: AddSaveCommandBarProps): IContextualMenuItem[] => {
    return [
        {
            key: 'new',
            name: 'Add',
            iconProps: {
                iconName: 'Add'
            },
            onClick: (ev: React.MouseEvent<HTMLButtonElement>) => props.onAdd()
        },
        {
            key: 'save',
            name: 'Save Changes',
            onRender: onRenderSaveButton(props)
        }
    ];
};


export const AddSaveCommandBar = (props: AddSaveCommandBarProps) => {
    return (
        <CommandBar
            items={buildCommands(props)}
            isSearchBoxVisible={false}
        />
    );
}