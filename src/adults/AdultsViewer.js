//@flow
import React, {Component} from 'react';
import type {Adult} from './AdultsTypes';
import {Trans, translate} from "react-i18next";
import {Button} from "material-ui";

type Props = {
    adults: Array<Adult>,
    onRemoveClick: Function,
    onUpdateClick: Function,
    onAddAdultClick: Function
};

class AdultsViewer extends Component<Props, void> {
    renderAdultsList(adults: Array<Adult>) {
        return (
            <ul className="ItemList">
                {adults.map((adult) => (
                    <li className="Item" key={adult.id}>
                        <span style={{float: 'left'}} onClick={() => this.props.onUpdateClick(adult.id)}>
                            {adult.nom} - {adult.data_naixement} - {adult.rol.toUpperCase()}
                        </span>
                        <button style={{float: 'right'}} className="littlebutton" key={"delete" + adult.id} onClick={   () => this.props.onRemoveClick(adult.id)}>
                            <i className="material-icons">delete</i>
                        </button>
                        <button style={{float: 'right'}} className="littlebutton" key={"edit" + adult.id} onClick={() => this.props.onUpdateClick(adult.id)}>
                            <i className="material-icons">edit</i>
                        </button>
                    </li>
                ))}
            </ul>);
    }

    render() {
        return (
            <div>
                <h1><Trans>Persones de la unitat de convivència</Trans></h1>
                <div className="FormContainer">
                    {this.renderAdultsList(this.props.adults)}
                </div>
                <Button variant="raised" color="primary"  id='AddAdultButton' onClick={this.props.onAddAdultClick}><Trans>Afegir una persona</Trans></Button>
            </div>
        );
    }
}

export default translate('translations')(AdultsViewer);