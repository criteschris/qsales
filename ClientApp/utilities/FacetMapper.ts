import { map } from 'ramda';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IFacet } from '../types/IFacet';

export const mapFacetToIDropdownOption = (facets: IFacet[]) => map(c => ({ key: c.id, text: c.name } as IDropdownOption), facets);