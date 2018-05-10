import * as React from 'react';
import { addIndex, always, append, compose, equals, head, ifElse, insert, map, remove, slice, update, when } from 'ramda';

import { Button } from 'office-ui-fabric-react/lib/Button';
import { Layer } from 'office-ui-fabric-react/lib/Layer'
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { EditableListWithCommandBar } from '../EditableListWithCommandBar';

import { IFacet } from '../../types/IFacet';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface FacetListProps {
    facets: IFacet[];
    onSave: (facets: IFacet[]) => Promise<IFacet[]>;
}

export interface FacetListState {
    facets: IFacet[];
    updates: IFacet[];
    isSaving: boolean;
    successMessage: string;
    errorMessage: string;
    toastMessageClass: string;
}

export class FacetList extends React.PureComponent<FacetListProps, FacetListState> {

    constructor(props: FacetListProps) {
        super(props);

        this.state = {
            facets: props.facets,
            updates: [],
            isSaving: false,
            successMessage: '',
            errorMessage: '',
            toastMessageClass: AnimationClassNames.scaleUpIn100
        };
    }

    @autobind
    private setToastMessageClass() {
        setTimeout(_ => {
            this.setState({
                toastMessageClass: AnimationClassNames.fadeOut500
            });
            
            setTimeout(_ => {
                this.setState({
                    successMessage: '',
                    errorMessage: ''
                });
            }, 600);
        }, 2000);
    }

    @autobind
    private renderToastMessage(message: string, bgColorClass: string): JSX.Element {
        return (
            <Layer>
                <div className={`ms-fontColor-white toast-message ${bgColorClass} ${this.state.toastMessageClass}`}>{message}</div>
            </Layer>
        );
    }

    @autobind
    private _onChanged(facet: IFacet, index: number) {
        this.setState({
            facets: update(index, facet, this.state.facets)
        });
    }

    @autobind
    private _onAdd() {
        this.setState({
            facets: append({} as IFacet, this.state.facets)
        });
    }

    @autobind
    private _onSave() {
        this.setState({
            isSaving: true,
            toastMessageClass: AnimationClassNames.scaleUpIn100
        });

        this.props.onSave(this.state.facets).then(facets => {
            this.setState({
                facets,
                isSaving: false,
                successMessage: 'All changes were successfully saved'
            });

            this.setToastMessageClass();
        }).catch(err => {
            this.setState({
                isSaving: false,
                errorMessage: err
            });

            this.setToastMessageClass();
        });

    }

    @autobind
    private _onDelete(index: number) {
        this.setState({
            facets: remove(index, 1, this.state.facets)
        });
    }

    public render() {
        return (
            <div>
                {this.state.successMessage &&
                    this.renderToastMessage(this.state.successMessage, 'ms-bgColor-themePrimary')
                }
                {this.state.errorMessage &&
                    this.renderToastMessage(this.state.errorMessage, 'ms-bgColor-red')
                }
                <EditableListWithCommandBar
                    facets={this.state.facets}
                    isSaving={this.state.isSaving}
                    onAdd={this._onAdd}
                    onChanged={this._onChanged}
                    onDelete={this._onDelete}
                    onSave={this._onSave}
                />
            </div>
        );
    }
}