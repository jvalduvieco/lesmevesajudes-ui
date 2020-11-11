import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import FilterPanel from './FilterPanel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PositiveNegativeChart from './charts/PositiveNegativeComponent';
import ChronologicDataChart from './charts/ChronologicDataComponent';
import PersonsChart from './charts/PersonsChartComponent';
import AidChart from '../charts/AidChartComponent';
import {isEmpty} from 'ramda';
import {retrieveResults, countEdited} from '../DashboardAction';

type Props = {
  allResults: [],
  positiveNegativeData: Object,
  totalSimulationsByMonthData: Object,
  recalculatedSimulationsByMonthData: Object,
  retrieveResults: Function,
  simulationsByPersonsData: Object
  //countEdited: Function,
  //editedCount: 0,
};

var helpData = {};
var positiveNegativeData = {};

const SimulationsDashboard = (props :Props) => {

  if (isEmpty(props.allResults)) {
    props.retrieveResults();
    props.countEdited();
  }  else {
    helpData = props.helpData;
    positiveNegativeData = props.positiveNegativeData;
  }

  return (
    <Grid container direction='row'>
      <Grid xs={3} item>
        <FilterPanel />
      </Grid>
      <Grid container direction='column' xs={9} spacing={5} item>
        {/* row 1*/}
        <Grid container direction='row' xs={12} spacing={5} item>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <ChronologicDataChart totalSimuationsByMonth={props.totalSimulationsByMonthData}
                                      recalculatedSimulationsByMonth={props.recalculatedSimulationsByMonthData}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* row 2*/}
        <Grid container direction='row' xs={12}  spacing={5} item>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography align='center' variant="h5">Número de persones</Typography>
                <PersonsChart data={props.simulationsByPersonsData} />
                <Typography align='center'>{'Valor corresponents al any en curs'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <PositiveNegativeChart height={50} data={positiveNegativeData} />
                <Typography align='center'>{'Valor corresponents al any en curs'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    allResults: state.dashboard.results ? state.dashboard.results: [],
    totalSimulationsByMonthData: state.dashboard.totalSimulationsByMonthData,
    recalculatedSimulationsByMonthData: state.dashboard.recalculatedSimulationsByMonthData,
    simulationsByPersonsData: state.dashboard.simulationsByPersonsData,
    positiveNegativeData: state.dashboard.positiveNegativeData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    retrieveResults : bindActionCreators(retrieveResults, dispatch),
    countEdited : bindActionCreators(countEdited, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SimulationsDashboard);