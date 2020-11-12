import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import {isEmpty} from 'ramda';
import AidsTable from './AidsTable';
import FilterPanel from './FilterPanel';
import {retrieveAids} from '../DashboardAction';
import {FilterType} from './AidsDashboardTypes';

type Props = {
  aids: [],
  filter: FilterType,
  date: Date,
  retrieveAids: any
};

const AidsDashboard = (props :Props) => {

  if (isEmpty(props.aids)) {
    props.retrieveAids();
  }

  return (
    <Grid container>
      <Grid xs={3} container spacing={5} root>
          <FilterPanel />
      </Grid>
      <Grid xs={9} container direction="column" item spacing={5} root>
        <Grid xs item center>
          <AidsTable aids={props.aids} filter={props.filter} date={props.date}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    aids: state.dashboard.aids,
    filter: state.aidsDashboard.filter,
    date: state.aidsDashboard.date
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    retrieveAids : bindActionCreators(retrieveAids, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AidsDashboard);
