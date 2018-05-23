import { expect } from 'chai';
import { mapFacetToIDropdownOption } from './FacetMapper';
import 'mocha';

import { IFacet } from '../types/IFacet';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

describe('FacetMapper', function () {
    describe('mapFacetToIDropdownOption', function () {
        it('should map facet object to DropdownOption', function () {
            const facets: IFacet[] = [
                {
                    id: 0,
                    name: 'Test'
                }
            ];

            const result: IDropdownOption[] = mapFacetToIDropdownOption(facets);

            expect(result).deep.eq([{key: 0, text: 'Test'}]);
        });
    });
});