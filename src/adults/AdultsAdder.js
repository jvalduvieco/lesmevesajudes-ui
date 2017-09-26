//@flow
import React, { Component } from 'react';
import { LocalForm } from 'react-redux-form';
import AdultsFields from './AdultsFields';
import { connect } from 'react-redux';
import { addAdult } from './AdultsActions';
import type {Adult} from './AdultsTypes';
import * as UUID from '../shared/UUID';

class AdultsAdder extends Component {
    handleSubmit(formValues: Adult) {
        this.props.addAdult({...formValues, 'id': UUID.create()});
        this.props.history.push('/adults');
    }

    componentWillMount() {}
    render() {
        return (
            <div>
                <h1>Afegir un nou adult a la unitat de convivència</h1>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}
                >
                    <AdultsFields />
                    <button type="submit">
                        Validar
                    </button>
                </LocalForm>
            </div>
        );
    }
}

export default connect(null, {addAdult})(AdultsAdder);
