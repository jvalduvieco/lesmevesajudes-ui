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
var housingData = {} // simulation - residence - relacio_habitatge

// return format: [["GG_270_mensual",3],["GE_051_03_mensual",2],...]


const aidsData = [{
	"codi": "HA_077_01",
	"descripcio": "Prestacions econòmiques d'urgència social derivades de la mediació a Barcelona",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Habitatge"
},
{
	"codi": "HG_077_02",
	"descripcio": "Prestacions econòmiques d’especial urgència davant la pèrdua de l’habitatge per desnonament o execució hipotecària",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Habitatge"
},{
	"codi": "HG_077_03",
	"descripcio": "Prestacions econòmiques d’especial urgència per al pagament de quotes d'amortització hipotecària",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Habitatge"
},{
	"codi": "HG_077_04",
	"descripcio": "Prestacions econòmiques d’especial urgència per al pagament de deutes del lloguer",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Habitatge"
},{
	"codi": "HA_077_04_01",
	"descripcio": "Ajut complementari a les prestacions econòmiques d’especial urgència per al pagament de deutes del lloguer",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Habitatge"
},{
	"codi": "HE_077_00",
	"descripcio": "Subvencions per al pagament de lloguer",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Habitatge"
},{
	"codi": "EG_233",
	"descripcio": "Beques menjador escolar de Barcelona",
	"data_inici": null,
	"data_fi": null,
	"tipus":"Educació"
},{
	"codi": "GA_234_01",
	"descripcio": "Vincles - Gratuïta",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GA_234_02",
	"descripcio": "Vincles - Amb tauleta pròpia",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GG_270",
	"descripcio": "Renda garantida ciutadana",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GE_051_04",
	"descripcio": "Renda activa d'inserció aturats de llarga durada",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GE_051_01",
	"descripcio": "Renda activa d'inserció discapacitat 33%",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GE_051_02",
	"descripcio": "Renda activa d'inserció per a emigrants retornats",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GE_051_03",
	"descripcio": "Renda activa d'inserció per a víctimes de violència de gènere o domèstica",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GA_246_01",
	"descripcio": " Targeta rosa - Gratuïta",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
},{
	"codi": "GA_246_02",
	"descripcio": "Targeta rosa - Reduïda",
	"data_inici": null,
	"data_fi": null,
	"tipus":null
}]


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
  };
  return props;
}

export default connect(mapStateToProps,{retrieveDashboard})(DashboardPage);
