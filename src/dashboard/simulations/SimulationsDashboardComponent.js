import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import FilterPanel from './FilterPanel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PositiveNegativeChart from './charts/PositiveNegativeComponent';
import AidChart from '../charts/AidChartComponent';
import {isEmpty} from 'ramda';
import {retrieveDashboard} from '../DashboardAction';

type Props = {
  helpData: Object,
  positiveNegativeData: Object,
  retrieveDashboard: Function,
};

var helpData = {};
var positiveNegativeData = {};

const SimulationsDashboard = (props :Props) => {

  if (isEmpty(props.allResults)) {
    props.retrieveDashboard();
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
        <Grid container direction='row' xs={9} spacing={5} item>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography align='center' variant="h5">Número total de simulacions</Typography>
                <Typography align='center'>{props.allResults ? props.allResults.length : 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography align='center' variant="h5">Simulacions recalculades</Typography>
                <Typography align='center'>{props.allResults ? props.allResults.length : 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* row 2*/}
        <Grid container direction='row' xs={9}  spacing={5} item>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography align='center' variant="h5">Simulacions recuperades</Typography>
                <Typography align='center'>{props.allResults ? props.allResults.length : 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <PositiveNegativeChart height={50} data={positiveNegativeData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

{/*<Grid container direction="row">
  <Grid xs={3} container spacing={5}>
    <FilterPanel />
  </Grid>
  <Grid xs={9} container direction="colum" root>
    <Grid container direction="row" xs item spacing={5} item>
      <Grid xs={6} item>
        <Card>
          <CardContent>
          <Typography align='center' variant="h5">Número total de simulacions</Typography>
          <Typography align='center'>{props.allResults ? props.allResults.length : 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    <Grid xs={9} container direction="row" xs item spacing={5} item>
      <Grid align='center' xs={6} item>
        <Card>
          <CardContent>
            <PositiveNegativeChart height={50} data={positiveNegativeData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={6} item>
        <Card>
          <CardContent>
            <AidChart data={helpData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
</Grid>*/}

const mapStateToProps = (state) => {
  return {
    helpData: state.dashboard.results,
    positiveNegativeData: state.dashboard.positiveNegativeData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    retrieveDashboard : bindActionCreators(retrieveDashboard, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SimulationsDashboard);
