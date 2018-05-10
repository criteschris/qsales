import * as React from 'react';
import { render } from 'react-dom';
import { Promise } from 'es6-promise';

import { Container } from '../Container';
import { FacetList } from '../../components/FacetList';

import { IFacet } from '../../types/IFacet';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export const ManageOperationHours = () => {

    const initialState = (window as any).initialState as IFacet[];

    const onSave = (facets: IFacet[]): Promise<IFacet[]> => {
        return new Promise((resolve, reject) => {
            fetch('/admin/saveoperationhours', {
                method: 'POST',
                body: JSON.stringify(facets),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                if (!response.ok) {
                    reject(response.statusText);
                } else {
                    resolve(response.json());
                }
            });
        });
    }

    return (
        <Container>
            <h2>Manage the operational time slots used by the application</h2>
            <p>Deleting a time slot will remove all data related to it. Be aware that you will lose all historical data about this time slot.</p>
            <div className='row'>
                <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                    <FacetList
                        facets={initialState}
                        onSave={onSave}
                    />
                </div>
            </div>
        </Container>
    );
}

render(<ManageOperationHours />, document.getElementById('react-app'));