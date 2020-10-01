import React from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import {retrieveAllSimulations} from '../results/FetchSimulationAction';
import {append,
        compose,
        map,
        filter,
        isNil,
        isEmpty,
        forEach,
        find,
        keys,
        flatten,
        values,
        pickAll,
        reduce,
        pluck,
        any,
        countBy,
        concat,
        groupWith,
        equals,
        pipe,
        chain,
        or,
        toPairs,
        groupBy,
        prop,
        sortBy,
        reverse,
        head} from 'ramda';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';

type Props = {
  simulations: any,
  dispatch: Function,
};

const ajudesPersonalsKeys = ['AE_230_01_mensual','AE_230_mensual','EG_233_mensual','GA_234_01','GA_234_02','GA_246_01','GA_246_02',
                    'GE_051_00_mensual','GE_051_01_mensual','GE_051_02_mensual','GE_051_03_mensual','GG_270_mensual']
const ajudesConvivenciaKeys = ['HA_002','HA_003','HA_004','HA_004_01','HA_005']

export const DashboardPage = (props :Props) => {


  var positiveNegativeCounter = [0,0,0]
  var result;

  if (props.simulations.length === 0) {
    props.retrieveAllSimulations()
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

    //const getValue = (key, object) => object ? object[key] : null
    const getValue = (key, object) => {
      if (object) {
         return object[key]
      }  else {
        return '';
      }
    }
    const isZero = (value, key) => value[key] === 0

    const personesList = map(r => r.persones)(results)
    const personesValuesList = map(v => {
      // reduce persona helps to a single result
      const vs = pipe(chain(toPairs), groupBy(head), map(pluck(1)))(values(v))
      return map(i => reduce(or,0,pluck(head(keys(head(values(i)))), i)),vs)
    })(personesList)

    const unitatsDeConvivenciaList = map(r => r.unitats_de_convivencia)(results)
    const filteredUnitatsDeConvivenciaList = filter(uc => !isNil(uc) && !isEmpty(uc))(unitatsDeConvivenciaList)
    const unitatsDeConvivenciaValuesList = map(v => getValue(head(keys(v)),v))(filteredUnitatsDeConvivenciaList)

    const ajudesPersona = map(pickAll(ajudesPersonalsKeys))(personesValuesList)
    const ajudesConvivencia = map(uc => {
      if (uc) {
        return pickAll(ajudesConvivenciaKeys)
      } else {
        console.log('');
      }
    })(unitatsDeConvivenciaValuesList)
    const ajudes = concat(ajudesPersona, ajudesConvivencia)
    //const ajudesValues = map(a => map(b => values(b)[0] > 0 ? 1 : 0, a))(ajudes)
    const ajudesValues = map(a => map(b => b > 0 ? 1 : 0, a))(ajudes)
    //const ajudesValues = map(map(b => head(values(b)) > 0 ? 1 : 0))(ajudes)

    const ajudesPositives = filter(a => any(v => v > 0, values(a)))(ajudesValues)

    const groupedAjudes = pipe(chain(toPairs), groupBy(head), map(pluck(1)))(ajudesPositives)
    result = map(a => reduce((a,b)=>a+b,0,a))(groupedAjudes)
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
        backgroundColor: 'rgba(255,99,132,0.2)',
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
  		backgroundColor: ['Green','Crimson','SlateGrey'],
  		hoverBackgroundColor: ['ForestGreen','Red','LightSlateGray']
  	}]
  };

	return (
    <Grid xs={12}>

      <Grid>Número total de simulacions: {props.simulations ? props.simulations.length : 0}</Grid>
      <Grid>Perfils:</Grid>
      <Grid container xs={12}>
        <Grid xs={6} >
          <HorizontalBar data={data1} />
        </Grid>
        <Grid xs={6}>
          <Doughnut data={data2} />
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

export default connect(mapStateToProps,{retrieveAllSimulations})(DashboardPage);
