import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import {isEmpty, keys, values} from 'ramda';
import FilterPanel from './FilterPanel';
import SexChart from './charts/SexChartComponent';
import AgeChart from './charts/AgeChartComponent';
import HousingChart from './charts/HousingChartComponent2';
import AidChart from '../charts/AidChartComponent';
import ViolenceChart from './charts/ViolenceChartComponent';
import LaboralChart from './charts/LaboralChartComponent';
import SchoolChart from './charts/SchoolChartComponent';
import DisabledChart from './charts/DisabledChartComponent';
import IncomesChart from './charts/IncomesChartComponent';
import {SexType, YesNoType} from '../DashboardTypes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {retrieveDashboardProfilesData} from '../DashboardAction';
import Box from '@material-ui/core/Box';

type Props = {
  allResults: [],
  helpData: Object,
  positiveNegativeData: Object,
  aids: List<AidType>,
  //helpData: Object,
  sexData: SexType,
  schoolData: YesNoType,
  violenceData: YesNoType,
  disabledData: YesNoType,
  laboralData: Object,
  ageData: Object,
  housingData: Object,
};

//var helpData = {};
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
    props.retrieveDashboardProfilesData();
  }  else {
    sexData = props.sexData;
    schoolData = props.schoolData;
    violenceData = props.violenceData;
    disabledData = props.disabledData;
    //helpData = props.helpData;
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
      <Grid xs={9} container direction="column" item root>
        <Grid container direction="row" xs item>
          <Grid xs item>
            <Box m={1}>
              <Card>
                <CardContent>
                  <LaboralChart data={laboralData} />
                </CardContent>
              </Card>
            </Box>
            <Box m={1}>
              <Card>
                <CardContent>
                  <HousingChart data={housingData} />
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid container direction="column" xs item>
            <Grid container direction="row" xs item >
              <Box m={1}>
                <Card >
                  <CardContent>
                    <SexChart data={sexData} />
                  </CardContent>
                </Card>
              </Box>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <AgeChart data={ageData} />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid container direction="row" xs item>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <ViolenceChart data={violenceData} />
                  </CardContent>
                </Card>
              </Box>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <SchoolChart data={schoolData} />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid container direction="row" xs item>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <IncomesChart />
                    </CardContent>
                </Card>
              </Box>
              <Box m={1}>
                <Card >
                  <CardContent m={1} bgcolor={'#bdcebe'}>
                    <DisabledChart data={disabledData} />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function mapStateToProps(state) {
  var props = {
	  allResults: state.dashboard.results,
    //helpData: state.dashboard.helpData,
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
    retrieveDashboardProfilesData : bindActionCreators(retrieveDashboardProfilesData, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimulationsDashboard);
