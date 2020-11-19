import React from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import {AppFormContainer} from '../components/AppForms';
import type {Person, PersonID} from '../persons/PersonTypes';
import {submitReport} from "../reportBug/ReportBugActions";
import {retrieveSimulation, fetchSimulation} from './FetchSimulationAction';
import SimulationMissingData from './SimulationMissingData';
import SimulationLoading from './SimulationLoading';
import SimulationError from './SimulationError';
import SimulationSuccess from './SimulationSuccess';
import AdminForm from '../admin/AdminForm';
import {SHOW_REPORT_BUG} from '../config';
import ReportBugForm from '../reportBug/ReportBugForm';
import {getReportBugDataFromLocalStorage} from '../reportBug/ReportBugPage';

type Props = {
  classes: Object,
  dispatch: Function,
  isError: boolean,
  isRequestDone: boolean,
  persons: Map<PersonID, Person>,
  resultsData: any,
  simulationData: any,
  simulationID: string,
  initialSimulationId: string,
  isAdmin: boolean,
  retrieveSimulationError: string,
  printSimulation: boolean,
};


class ResultsPage extends React.Component<Props> {
  submitReport = values => {
    // print the form values to the console
    console.log('form submit:', values);
    this.props.submitReport(values);
  };

  enoughDataForSimulation() {
    return this.props.persons.count() > 0;
  }

  componentDidMount() {
	  if (this.enoughDataForSimulation()) {
		  this.props.fetchSimulation(this.props.simulationID, this.props.simulationData);
	  }
  }

  constructor(props) {
    super(props);
    this.submitReport = this.submitReport.bind(this);
  }

  submitSimulationId = values => {
	  this.props.retrieveSimulation(values.simulation_id);
  }

  render() {
    const {isError, isRequestDone, resultsData, persons, simulationID, initialSimulationId, classes, isAdmin, simulationData} = this.props;
    if (!this.enoughDataForSimulation() && !isAdmin) {
      return (<SimulationMissingData/>);
    }

    if (!this.enoughDataForSimulation() && isAdmin) {
        return (
            <AppFormContainer>

	              <Grid item xs={12} sm={11}>
		              <AdminForm onSubmit={this.submitSimulationId} retrieveSimulationError={this.props.retrieveSimulationError}/>
	              </Grid>
            </AppFormContainer>
        );
      }

    if (!isRequestDone) {
      return (<SimulationLoading/>);
    }

    if (isRequestDone && isError) {
      return (<SimulationError simulationID={simulationID}/>);
    }
    return (
      <fragment>
        <SimulationSuccess
        resultsData={resultsData}
        persons={persons}
        simulationID={simulationID}
        initialSimulationId={initialSimulationId}
        printSimulation = {this.props.printSimulation}
        simulationData = {simulationData}
        />
        {/*SHOW_REPORT_BUG &&*/}
          <Grid item xs={12}>
            <ReportBugForm initialValues={getReportBugDataFromLocalStorage()} onSubmit={this.submitReport}/>
          </Grid>
      </fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isError: state.results.isError,
    isRequestDone: state.results.isRequestDone,
    simulationData: state,
    resultsData: state.results.response,
    simulationID: state.results.simulationID !== null ? state.results.simulationID : null,
    initialSimulationId : state.results.initialSimulationId !== undefined ? state.results.initialSimulationId : null,
    persons: state.persons,
    isAdmin: state.admin.isAdmin,
    retrieveSimulationError: state.results.retrieveSimulationError,
    printSimulation: state.results.printSimulation,
  };
}

export default connect(mapStateToProps, {fetchSimulation, retrieveSimulation, submitReport})(ResultsPage);
