import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import FilterPanel from './FilterPanel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ChronologicDataChart from './charts/ChronologicDataComponent';
import DonutChart from '../../components/Charts/DonutChartComponent';
import HorizontalBarChart from '../../components/Charts/HorizontalBarChartComponent';
import {keys, map, pipe} from 'ramda';
import {retrieveResults, countEdited} from '../DashboardAction';
import {useTranslation} from 'react-i18next';

type Props = {
  allResults: [],
  positiveNegativeData: Object,
  totalSimulationsByMonthData: Object,
  recalculatedSimulationsByMonthData: Object,
  retrieveResults: Function,
  simulationsByPersonsData: Object,
  fromDate: Date,
  untilDate: Date,
};

const SimulationsDashboard = (props :Props) => {

  const {t} = useTranslation('dashboard');

  useEffect(() => {
    console.log(props.fromDate.getMonth)
    props.retrieveResults(props.fromDate, props.untilDate);
  },[props.fromDate, props.untilDate])

  var getPersonLabel = number => number + ' Persones'

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
                  <HorizontalBarChart data={props.simulationsByPersonsData} title={'Per nº de persones'} labels={pipe(keys,map(getPersonLabel))(props.simulationsByPersonsData)} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <DonutChart height={50} data={props.positiveNegativeData} title={t('simulation_resultats')}/>
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
    fromDate: state.simulationsDashboard.fromDate,
    untilDate: state.simulationsDashboard.untilDate
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
