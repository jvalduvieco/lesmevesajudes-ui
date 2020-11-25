import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';
import {isEmpty, keys, values} from 'ramda';
import FilterPanel from './FilterPanel';
import {SexType, YesNoType} from '../DashboardTypes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HorizontalBarChart from '../../components/Charts/HorizontalBarChartComponent';
import DonutChart from '../../components/Charts/DonutChartComponent';
import {retrieveDashboardProfilesData} from '../DashboardAction';
import Box from '@material-ui/core/Box';
import {useTranslation} from 'react-i18next';

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
  incomes: Object,
};

var aidData = {};
var sexData= {};
var ageData= {};
var laboralData={};
var schoolData={};
var disabledData={};
var violenceData={};
var housingData = {};
var incomesData = {};

const AnalysisSimulationsDashboard = (props :Props) => {

  const {t} = useTranslation('dashboard');

  if (isEmpty(values(props.aidData))) {
    props.retrieveDashboardProfilesData();
  }  else {
    sexData = props.sexData;
    schoolData = props.schoolData;
    violenceData = props.violenceData;
    disabledData = props.disabledData;
    aidData = props.aidData;
    laboralData = props.laboralData;
    ageData = props.ageData;
    housingData = props.housingData;
    //incomesData = props.incomesData;
    incomesData = {'Baix':2000,'Mig':1500,'Alt':200};
  }

  return (
    <Grid container>
      <Grid xs={3} container spacing={5} root>
        <FilterPanel aids={keys(aidData)} laborals={keys(laboralData)} />
      </Grid>
      <Grid xs={9} container direction="column" item root>
        <Grid container direction="row" xs item>
          <Grid xs item>
            <Box m={1}>
              <Card>
                <CardContent>
                  <HorizontalBarChart data={aidData} title={'aids'} prefix={''}/>
                </CardContent>
              </Card>
            </Box>
            <Box m={1}>
              <Card>
                <CardContent>
                  <HorizontalBarChart data={laboralData} title={'laboral'} prefix={'laboral_'}/>
                </CardContent>
              </Card>
            </Box>
            <Box m={1}>
              <Card>
                <CardContent>
                  <HorizontalBarChart data={housingData} title={'habitatge'} prefix={'habitatge_'}/>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid container direction="column" xs item>
            <Grid container direction="row" xs item >
              <Box m={1}>
                <Card >
                  <CardContent>
                    <DonutChart data={sexData} title={t('sexe')}/>
                  </CardContent>
                </Card>
              </Box>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <DonutChart data={ageData} title={t('edat')}/>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid container direction="row" xs item>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <DonutChart data={violenceData} title={t('violencia')}/>
                  </CardContent>
                </Card>
              </Box>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <DonutChart data={schoolData} title={t('escolarització')}/>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid container direction="row" xs item>
              <Box m={1}>
                <Card >
                  <CardContent>
                    <DonutChart data={incomesData} title={t('ingressos')} />
                  </CardContent>
                </Card>
              </Box>
              <Box m={1}>
                <Card >
                  <CardContent m={1} bgcolor={'#bdcebe'}>
                    <DonutChart data={disabledData} title={t('discapacitat')}/>
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
    aidData: state.dashboard.aidData,
    positiveNegativeData: state.dashboard.positiveNegativeData,
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisSimulationsDashboard);
