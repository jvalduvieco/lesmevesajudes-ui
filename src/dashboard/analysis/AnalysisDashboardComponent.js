import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import {isEmpty, keys, values} from 'ramda';
import FilterPanel from './FilterPanel';
import SexChart from './charts/SexChartComponent';
import AgeChart from './charts/AgeChartComponent';
import HousingChart from './charts/HousingChartComponent';
import AidChart from '../charts/AidChartComponent';
import ViolenceChart from './charts/ViolenceChartComponent';
import LaboralChart from './charts/LaboralChartComponent';
import SchoolChart from './charts/SchoolChartComponent';
import DisabledChart from './charts/DisabledChartComponent';
import {SexType, YesNoType} from '../DashboardTypes';
import {retrieveDashboard} from '../DashboardAction';

type Props = {
  allResults: [],
  helpData: Object,
  positiveNegativeData: Object,
  aids: List<AidType>,
  helpData: Object,
  sexData: SexType,
  schoolData: YesNoType,
  violenceData: YesNoType,
  disabledData: YesNoType,
  laboralData: Object,
  ageData: Object,
  housingData: Object,
};

var helpData = {};
var sexData= {};
var ageData= {};
var laboralData={};
var schoolData={};
var disabledData={};
var violenceData={};
var housingData = {};
var aidsData = [];

const SimulationsDashboard = (props :Props) => {

  if (isEmpty(props.allResults)) {
    props.retrieveDashboard();
  }  else {
    sexData = props.sexData;
    schoolData = props.schoolData;
    violenceData = props.violenceData;
    disabledData = props.disabledData;
    helpData = props.helpData;
    laboralData = props.laboralData;
    ageData = props.ageData;
    housingData = props.housingData;
    aidsData = props.aids;
  }

  return (
    <Grid container>
      <Grid xs={3} container spacing={5} root>
        <FilterPanel aids={values(aidsData)} laborals={keys(laboralData)} />
      </Grid>
      <Grid xs={9} container direction="column" item spacing={5} root>
        <Grid container direction="row" xs item spacing={5}>
          <Grid xs={6} item>
            <AidChart data={helpData} />
          </Grid>
        </Grid>
        <Grid container direction="row" xs item>
          <Grid container direction="column" xs item spacing={5}>
            <Grid container direction="row" xs item >
              <SexChart data={sexData} />
              <AgeChart data={ageData} />
            </Grid>
            <Grid container direction="row" xs item spacing={5}>
              <ViolenceChart data={violenceData} />
              <SchoolChart data={schoolData} />
            </Grid>
            <Grid container direction="row" xs item spacing={5}>
              <HousingChart data={housingData} />
              <DisabledChart data={disabledData} />
            </Grid>
          </Grid>
          <Grid xs={6} >
            <LaboralChart data={laboralData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function mapStateToProps(state) {
  var props = {
	  allResults: state.dashboard.results,
    helpData: state.dashboard.helpData,
    positiveNegativeData: state.dashboard.positiveNegativeData,
    aids: state.dashboard.aids,
    sexData: state.dashboard.sexData,
    schoolData: state.dashboard.schoolData,
    violenceData: state.dashboard.violenceData,
    disabledData: state.dashboard.disabledData,
    laboralData: state.dashboard.laboralData,
    ageData: state.dashboard.ageData,
    housingData: state.dashboard.housingData,
  };
  return props;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    retrieveDashboard : bindActionCreators(retrieveDashboard, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimulationsDashboard);
