import React from 'react';
import {connect} from 'react-redux';
import {Grid,Typography} from '@material-ui/core';
import {retrieveDashboard} from './DashboardAction';
import {isEmpty,
        compose,
        keys,
        last,
        map,
        omit,
        prop,
        reverse,
        sortBy,
        toPairs,
        values} from 'ramda';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import SexChart from './charts/SexChartComponent';
import AgeChart from './charts/AgeChartComponent';
import HousingChart from './charts/HousingChartComponent';
import ViolenceChart from './charts/ViolenceChartComponent';
import LaboralChart from './charts/LaboralChartComponent';
import SchoolChart from './charts/SchoolChartComponent';
import DisabledChart from './charts/DisabledChartComponent';
import {SexType, YesNoType} from './DashboardTypes';

type Props = {
  allResults: any,
  helpData: Object,
  sexData: SexType,
  schoolData: YesNoType,
  violenceData: YesNoType,
  disabledData: YesNoType,
  dispatch: Function,
  retrieveDashboard: any
};

var helpData = {};
var sexData= {"homes":0,"dones":0};
var ageData={"menors":20,"adults":50,"jubilats":30};
const laboralData={"Treball per compte propi":10,
                  "Treballa per compte propi":10,
                  "Treball per compte d'altri jornada complerta":10,
                  "Treball per compte d'altri jornada parcial":15,
                  "Aturat":5,
                  "Tasques de la llar":20,
                  "Estudiant o pràctiques sense remunerar":10,
                  "Jubilat/ada o prejubilat/ada":10,
                  "Altres situacions":10}
var schoolData={"yes":0,"no":0};
var disabledData={"yes":0,"no":0};
var violenceData={"yes":0,"no":0};
const housingData = {"Visc en un habitatge de propietat sense hipoteca":40,
                    "Visc en un habitatge  de propietat amb hipoteca":25,
                    "No tinc un habitatge fix":30,
                    "Visc en un habitatge en cessió d'ús":5} // simulation - residence - relacio_habitatge

// return format: [["GG_270_mensual",3],["GE_051_03_mensual",2],...]
const sortHelps = (helps) => compose(
                                reverse,
                                sortBy(v => last(values(v))
                                ))(toPairs(helps))

const getHelpLabels = (sortedHelpsArray) => map(v => prop(0,values(v)))(sortedHelpsArray)
const getHelpValues = (sortedHelpsArray) => map(v => prop(1,values(v)))(sortedHelpsArray)

export const DashboardPage = (props :Props) => {

  var positiveNegativeCounter = [0,0,0]

  if (isEmpty(props.allResults)) {
    props.retrieveDashboard();
  } else {
    sexData = props.sexData;
    schoolData = props.schoolData;
    violenceData = props.violenceData;
    disabledData = props.disabledData;
    helpData = props.helpData;
  }

  const sortedHelp = sortHelps(helpData)

  const data1 = {
    labels: getHelpLabels(sortedHelp),
    datasets: [
      {
        label: 'Ajudes',
        backgroundColor: '#eca1a6',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: getHelpValues(sortedHelp)
      }
    ]
  };

  const data2 = {
  	labels: ['Positives','Negatives','Error'],
  	datasets: [{
  		data: positiveNegativeCounter,
  		backgroundColor: ['#bdcebe','#eca1a6','#d6cbd3']
  	}]
  };

	return (
    <Grid xs={12} container spacing={5}>
      <Grid>Número total de simulacions: {props.results ? props.results.length : 0}</Grid>
      <Grid container direction="row" xs={12} item>
        <Grid xs={6} >
          <HorizontalBar data={data1} />
        </Grid>
        <Grid align='center' xs={6} item>
          <Typography headlineMapping='h3' color='textPrimary'>Simulacions positives/negatives</Typography>
          <Doughnut data={data2} />
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
  };
  return props;
}

export default connect(mapStateToProps,{retrieveDashboard})(DashboardPage);
