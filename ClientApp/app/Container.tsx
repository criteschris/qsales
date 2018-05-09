import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

export class Container extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);

        initializeIcons(/* optional base url */);
    }

    public render() {
        return (
            <Fabric>
                {this.props.children}
            </Fabric>
        );
    }
}