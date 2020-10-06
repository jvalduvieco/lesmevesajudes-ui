import React from 'react';
import {connect} from 'react-redux';
import {Grid,Typography} from '@material-ui/core';
import {retrieveAllResults} from '../results/FetchSimulationAction';
import {any,
        append,
        chain,
        compose,
        concat,
        filter,
        groupBy,
        head,
        isEmpty,
        isNil,
        keys,
        map,
        or,
        pickAll,
        pipe,
        pluck,
        reduce,
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

type Props = {
  simulations: any,
  dispatch: Function,
};

/*

{	"count": {"positives":34,"negatives":45, "error":10},
	"ajudes": [{
		"AE320":{
			"count": 34,
			"sex": {"homes":30,"dones":70}
			"age": {"menors":20,"adults":50,"jubilats":30}
			"disabled": {"yes":80,"no":20}
			"violence": {"yes":80,"no":20}
			"school": {"yes":80,"no":20}
		},"AE321":{
			"count": 34,
			"sex": {"homes":30,"dones":70}
			"age": {"menors":20,"adults":50,"jubilats":30}
			"disabled": {"yes":80,"no":20}
			"violence": {"yes":80,"no":20}
			"school": {"yes":80,"no":20}
		}]
}
*/

const ajudesPersonalsKeys = ['AE_230_01_mensual','AE_230_mensual','EG_233_mensual','GA_234_01','GA_234_02','GA_246_01','GA_246_02',
                    'GE_051_00_mensual','GE_051_01_mensual','GE_051_02_mensual','GE_051_03_mensual','GG_270_mensual']
const ajudesConvivenciaKeys = ['HA_002','HA_003','HA_004','HA_004_01','HA_005']

const sexData={"homes":30,"dones":70};
const ageData={"menors":20,"adults":50,"jubilats":30};
const laboralData={"Treball per compte propi":10,
                  "Treballa per compte propi":10,
                  "Treball per compte d'altri jornada complerta":10,
                  "Treball per compte d'altri jornada parcial":15,
                  "Aturat":5,
                  "Tasques de la llar":20,
                  "Estudiant o pràctiques sense remunerar":10,
                  "Jubilat/ada o prejubilat/ada":10,
                  "Altres situacions":10}
const schoolData={"yes":80,"no":20};
const disabledData={"yes":80,"no":20};
const violenceData={"yes":80,"no":20};
const housingData = {"Visc en un habitatge de propietat sense hipoteca":40,
                    "Visc en un habitatge de propietat amb hipoteca":25,
                    "No tinc un habitatge fix":30,
                    "Visc en un habitatge en cessió d'ús":5}

const getValue = (key, object) => object ? object[key] : ''
//const getValue = object => object ? object[head(keys(object))] : '' // {"1c61e969-bbe2-49e2-a950-0e99f22786f1": {"HA_001": {...}}, "HA_002": {...}}} -> {"HA_001": {...}, "HA_002": {...}}
const greaterThanZero = v => v > 0
const parsePositive = v => v > 0 ? 1 : 0

export const DashboardPage = (props :Props) => {

  var positiveNegativeCounter = [0,0,0]
  var result;

  if (props.simulations.length === 0) {
    props.retrieveAllResults()
  } else {
    var errors = compose(
                      filter(r => isNil(r) || isEmpty(r)),
                      map(s => s.result))(props.simulations)

    const results = compose(
                      filter(r => !isNil(r)),
                      map(r => {
                        try {
                          return JSON.parse(r);
                        } catch(error) {
                          errors = append(r,errors)
                          // do nothing
                        }
                      }),
                      filter(r => !isEmpty(r) && !isNil(r)),
                      map(s => s.result))(props.simulations)

    const personesList = map(r => r.persones)(results)
    const personesValuesList = map(v => {
      // reduce persona helps to a single result
      const vs = pipe(chain(toPairs), groupBy(head), map(pluck(1)))(values(v))
      return map(i => reduce(or,0,pluck(head(keys(head(values(i)))), i)),vs)
    })(personesList)

    const unitatsDeConvivenciaList = map(r => r.unitats_de_convivencia)(results)
    const filteredUnitatsDeConvivenciaList = filter(uc => !isNil(uc) && !isEmpty(uc))(unitatsDeConvivenciaList)
    //const unitatsDeConvivenciaValuesList = map(v => getValue(head(keys(v)),v))(filteredUnitatsDeConvivenciaList)
    const unitatsDeConvivenciaValuesList = map(uc => {
      // get child value nodes from unitat de convivencia parent node
      // {"1c61e969-bbe2-49e2-a950-0e99f22786f1": {"HA_001": {"2020-03":1},"HA_002": {"2020-03":1}}} -> {"HA_001": {"2020-03":1},"HA_002": {"2020-03":1}}
      const v = getValue(head(keys(uc)),uc)
      // remove date from values
      // {"HA_001": {"2020-03":1},"HA_002": {"2020-03":1}} -> {"HA_001": 1,"HA_002": :1}
      return pluck(head(keys(head(values(v)))))(v)
    })(filteredUnitatsDeConvivenciaList)

    const ajudesPersona = map(pickAll(ajudesPersonalsKeys))(personesValuesList)
    const ajudesConvivencia = map(pickAll(ajudesConvivenciaKeys))(unitatsDeConvivenciaValuesList)
    const ajudes = concat(ajudesPersona, ajudesConvivencia)
    const ajudesValues = map(map(parsePositive))(ajudes)
    const ajudesPositives = filter(a => any(greaterThanZero, values(a)))(ajudesValues)
    const groupedAjudes = pipe(chain(toPairs), groupBy(head), map(pluck(1)))(ajudesPositives)
    result = map(a => reduce((a,b) => a + b,0,a))(groupedAjudes)

    //TODO pending sort
    //const pairs =toPairs(result)
    //sortedResult = reverse(sortBy(a => head(values(a)))(result))

    positiveNegativeCounter = [ajudesPositives.length, props.simulations.length - ajudesPositives.length - errors.length, errors.length]
  }

  const data1 = {
    labels: result ? keys(result) : [],
    datasets: [
      {
        label: 'Ajudes',
        backgroundColor: '#eca1a6',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: result ? values(result) : []
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
      <Grid>Número total de simulacions: {props.simulations ? props.simulations.length : 0}</Grid>
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
	  simulations: state.dashboard.simulations,
  };
  return props;
}

export default connect(mapStateToProps,{retrieveAllResults})(DashboardPage);
