import React from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import {retrieveDashboard} from './DashboardAction';
import {isEmpty} from 'ramda';
import SexChart from './charts/SexChartComponent';
import AgeChart from './charts/AgeChartComponent';
import HousingChart from './charts/HousingChartComponent';
import ViolenceChart from './charts/ViolenceChartComponent';
import LaboralChart from './charts/LaboralChartComponent';
import SchoolChart from './charts/SchoolChartComponent';
import DisabledChart from './charts/DisabledChartComponent';
import {SexType, YesNoType} from './DashboardTypes';
import AidsTable from './AidsTable';
import PositiveNegativeChart from './charts/PositiveNegativeComponent'
import AidChart from './charts/AidChartComponent'

type Props = {
  allResults: any,
  positiveNegativeData: Object,
  helpData: Object,
  sexData: SexType,
  schoolData: YesNoType,
  violenceData: YesNoType,
  disabledData: YesNoType,
  laboralData: Object,
  ageData: Object,
  housingData: Object,
  dispatch: Function,
  aids: List,
  retrieveDashboard: any
};

var helpData = {};
var positiveNegativeData = {};
var sexData= {};
var ageData= {};
var laboralData={};
var schoolData={};
var disabledData={};
var violenceData={};
var housingData = {}
var aidsData = []

export const DashboardPage = (props :Props) => {

  if (isEmpty(props.allResults)) {
    props.retrieveDashboard();
  } else {
    sexData = props.sexData;
    schoolData = props.schoolData;
    violenceData = props.violenceData;
    disabledData = props.disabledData;
    helpData = props.helpData;
    laboralData = props.laboralData;
    ageData = props.ageData;
    housingData = props.housingData;
    positiveNegativeData = props.positiveNegativeData;
    aidsData = props.aids;
  }

  return (
    <Grid xs={12} container spacing={5} root>
      <Grid item>Número total de simulacions: {props.allResults ? props.allResults.length : 0}</Grid>
      <Grid xs={12} item center>
        <AidsTable aids={aidsData} />
      </Grid>

      <Grid container direction="row" xs={12} item>
        <Grid xs={6} >
          <AidChart data={helpData} />
        </Grid>
        <Grid align='center' xs={6} item>
          <PositiveNegativeChart height={50} data={positiveNegativeData} />
        </Grid>
      </Grid>
      <Grid container direction="row" xs item>
        <LaboralChart data={laboralData} />
        <Grid container direction="column" xs spacing={5}>
          <Grid container direction="row" xs item>
            <SexChart data={sexData} />
            <AgeChart data={ageData} />
          </Grid>
          <Grid container direction="row" xs item>
            <ViolenceChart data={violenceData} />
            <SchoolChart data={schoolData} />
          </Grid>
          <Grid container direction="row" xs item>
            <HousingChart data={housingData} />
            <DisabledChart data={disabledData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>);
}

function mapStateToProps(state) {
  var props = {
	  allResults: state.dashboard.results,
  	sexData: state.dashboard.sexData,
    schoolData: state.dashboard.schoolData,
    violenceData: state.dashboard.violenceData,
    disabledData: state.dashboard.disabledData,
    helpData: state.dashboard.helpData,
    laboralData: state.dashboard.laboralData,
    ageData: state.dashboard.ageData,
    housingData: state.dashboard.housingData,
    positiveNegativeData: state.dashboard.positiveNegativeData,
    aids: state.dashboard.aids,
  };
  return props;
}

export default connect(mapStateToProps,{retrieveDashboard})(DashboardPage);
