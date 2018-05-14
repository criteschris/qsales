import * as React from 'react';
import { render } from 'react-dom';
import { map } from 'ramda';

import { Container } from './Container';
import { CompoundButton, Button } from 'office-ui-fabric-react/lib/Button';
import { IBar } from '../types/IBar';

export interface IHomeProps {

}

const renderBarButtons = (bar: IBar) => {
    return (
        <CompoundButton
            description='Manage this bar and all of its details'
            onClick={(ev: React.MouseEvent<Button>) => window.location.href = '/home/dashboard?b=' + bar.id}
        >{bar.name}
        </CompoundButton>
    )
}

export const Home = (props: IHomeProps) => {
    const initialState: IBar[] = (window as any).initialState;

    return (
        <Container>
            {map(renderBarButtons, initialState)}
        </Container>
    );
};

render(<Home />, document.getElementById('react-app'));