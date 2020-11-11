import axios from 'axios/index';
import {AIDS_URL, DASHBOARD_URL, DASHBOARD_COUNT_EDITED, SIMULATION_STORE_AUTH_TOKEN} from '../config';
import {SHOW_DASHBOARD_CHARTS, SHOW_DASHBOARD_AIDS, SHOW_DASHBOARD_EDITED_COUNT, SHOW_DASHBOARD_SIMULATIONS} from './DashboardReducer';
import {FilterType} from './DashboardTypes';
import {
    ascend,
    compose,
    countBy,
    equals,
    filter,
    flatten,
    forEach,
    has,
    isNil,
    length,
    map,
    not,
    merge,
    path,
    pipe,
    pluck,
    prop,
    sortWith,
    values } from 'ramda';

export const RETRIEVE_DASHBOARD_ERROR = 'RETRIEVE_DASHBOARD_ERROR';
export const TIMED_OUT_DASHBOARD = 'TIMED_OUT_DASHBOARD';

const esMenor = persona => prop('edat')(persona) < 18; //TODO is this the condition for an adult person?
const noEsMenor = persona => prop('edat')(persona) > 18;

const compareAge = age => {
  if (age < 18) {
    return 'menors'
  } else if (age > 65) {
    return 'jubilats'
  } else {
    return 'adults'
  }
}
const countPersons = result => pipe(prop('persones'), values, length)(result)
const months = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre']
const isOriginal = result => isNil(prop('id_parent',result));
const isRecalculated = result => not(isOriginal(result))
const hasDate = result => !isNil(result.data)
const currentYear = new Date().getFullYear()
const getMonth = result => months[getMonthNumber(result)]
const getMonthNumber = result => parseInt(result.data.substring(5, 7))
const getYear = result => parseInt(result.data.substring(0, 4))
const isCurrentYearResult = result => hasDate(result) && (getYear(result) === currentYear)


const collectHelpData = (results: List, filteredBy: FilterType) => {
  const ajudesPersones = compose(
                            countBy(forEach(v => v)),
                            flatten,
                            map(prop('ajudes')),
                            flatten,
                            map(prop('persones')))(results)

  const ajudesHabitatge = compose(
                            countBy(forEach(v => v)),
                            filter(v => v != null),
                            flatten,
                            map(path(['habitatge','ajudes'])))(results)
  return merge(ajudesPersones,ajudesHabitatge)
}

const collectSexData = (results: List, filter: FilterType) => compose(
                                                                  countBy(i => equals('dona',i) ? 'dona' : 'home'),
                                                                  flatten,
                                                                  map(pluck('sexe')),
                                                                  map(r => values(r.persones)))(results)


const yesNoCount = (attributeName, data) => compose(
                                              countBy(i => i ? 'yes' : 'no'),
                                              flatten,
                                              map(pluck(attributeName)),
                                              map(r => values(r.persones)))(data)

//solo hay que tener en cuenta las personas menores
const collectSchoolData = (results: List, resultFilter: FilterType) => compose(
                                                                          countBy(i => i ? 'yes' : 'no'),
                                                                          flatten,
                                                                          map(pluck('escolaritzacio')),
                                                                          filter(esMenor),
                                                                          flatten,
                                                                          map(r => values(r.persones)))(results)

const collectViolenceData = (results: List, resultFilter: FilterType) => yesNoCount('violencia',results)
const collectDisabledData = (results: List, resultFilter: FilterType) => yesNoCount('discapacitat',results)

// TODO sort laboral data?
const collectLaboralData = (results: List, resultFilter: FilterType) => compose(
                                                                            countBy(forEach(v => v)),
                                                                            pluck('situacio_laboral'),
                                                                            filter(has('situacio_laboral')),
                                                                            filter(noEsMenor),
                                                                            flatten,
                                                                            map(r => values(r.persones)))(results)
const collectAgeData = (results: List, resultFilter: FilterType) => compose(
                                                                        countBy(compareAge),
                                                                        pluck('edat'),
                                                                        flatten,
                                                                        map(r => values(r.persones)))(results)

const collectHousingData = (results: List, resultFilter: FilterType) => compose(
                                                                            countBy(forEach(v => v)),
                                                                            map(prop('relacio_habitatge')),
                                                                            filter(has('relacio_habitatge')),
                                                                            map(prop('habitatge')),
                                                                            filter(has('habitatge')))(results)
const collectPositiveNegativeData = (results: List, resultFilter: FilterType) => compose(
                                                                                     countBy(prop('estatus')),
                                                                                     filter(isCurrentYearResult)
                                                                                  )(results)
const collectByPersons = (result: List) => compose(
                                            countBy(countPersons),
                                            filter(isCurrentYearResult)
                                          )(result)

const collectSimulationsByMonth = (results: List) => compose(
                                                      countBy(getMonth),
                                                      sortWith([ascend(getMonthNumber)]),
                                                      filter(isOriginal),
                                                      filter(isCurrentYearResult))(results)


const collectRecalculatedSimulationsByMonth = (results: List) => compose(
                                                                  countBy(getMonth),
                                                                  sortWith([ascend(getMonthNumber)]),
                                                                  filter(isRecalculated),
                                                                  filter(isCurrentYearResult))(results)

export const retrieveAids = () => dispatch => {
  axios.get(AIDS_URL, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}}).then(response => {
  		if (response.status === 210) {
  			return dispatch({
  				type: RETRIEVE_DASHBOARD_ERROR,
  	      payload: TIMED_OUT_DASHBOARD,
  			});
  		}
      return dispatch ({
        type: SHOW_DASHBOARD_AIDS,
        aids: response.data.aids,
      });

      }).catch(error => {
        console.log(JSON.stringify(error, null, 2));
      //dispatch({
      //  type: RETRIEVE_SIMULATION_ERROR,
      //  payload: RETRIEVE_SIMULATION_ERROR,
      //});
      });
}

export const retrieveResults = () => async dispatch =>   {
  axios.get(DASHBOARD_URL, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}}).then(response => {
      if (response.status === 210) {
        return dispatch({
          type: RETRIEVE_DASHBOARD_ERROR,
          payload: TIMED_OUT_DASHBOARD,
        });
      }

      return dispatch ({
        type: SHOW_DASHBOARD_SIMULATIONS,
        results: response.data.dashboards,
        positiveNegativeData: collectPositiveNegativeData(response.data.dashboards),
        totalSimulationsByMonthData: collectSimulationsByMonth(response.data.dashboards),
        recalculatedSimulationsByMonthData: collectRecalculatedSimulationsByMonth(response.data.dashboards),
        simulationsByPersonsData: collectByPersons(response.data.dashboards)
      });

    }).catch(error => {
      console.log(JSON.stringify(error, null, 2));
      //dispatch({
      //  type: RETRIEVE_SIMULATION_ERROR,
      //  payload: RETRIEVE_SIMULATION_ERROR,
      //});
    });
}

export const retrieveDashboardProfilesData = () => async dispatch =>   {
  axios.get(DASHBOARD_URL, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}}).then(response => {
  		if (response.status === 210) {
  			return dispatch({
  				type: RETRIEVE_DASHBOARD_ERROR,
  	      payload: TIMED_OUT_DASHBOARD,
  			});
  		}


      var collectedSexData = collectSexData(response.data.dashboards);
      var collectedSchoolData = collectSchoolData(response.data.dashboards);
      var collectedViolenceData = collectViolenceData(response.data.dashboards);
      var collectedDisabledData = collectDisabledData(response.data.dashboards);
      //var collectedHelpData = collectHelpData(response.data.dashboards);
      var collectedLaboralData = collectLaboralData(response.data.dashboards);
      var collectedAgeData = collectAgeData(response.data.dashboards);
      var collectedHousingData = collectHousingData(response.data.dashboards);

  		return dispatch ({
        type: SHOW_DASHBOARD_CHARTS,
        results: response.data.dashboards,
        sexData: collectedSexData,
        schoolData: collectedSchoolData,
        violenceData: collectedViolenceData,
        disabledData: collectedViolenceData,
        //helpData: collectedDisabledData,
        laboralData: collectedLaboralData,
        ageData: collectedAgeData,
        housingData: collectedHousingData,
  		});

  	}).catch(error => {
      console.log(JSON.stringify(error, null, 2));
      //dispatch({
      //  type: RETRIEVE_SIMULATION_ERROR,
      //  payload: RETRIEVE_SIMULATION_ERROR,
      //});
    });
}

export const countEdited = () => async dispatch =>   {
  axios.get(DASHBOARD_COUNT_EDITED, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}})
        .then(response => {
          if (response.status === 210) {
            return dispatch({
              type: RETRIEVE_DASHBOARD_ERROR,
              payload: TIMED_OUT_DASHBOARD
            });
          }
          return dispatch ({
            type: SHOW_DASHBOARD_EDITED_COUNT,
            editedCount: response.data.count
          })
        }).catch(error => {
          console.log(JSON.stringify(error, null, 2));
          //dispatch({
          //  type: RETRIEVE_SIMULATION_ERROR,
          //  payload: RETRIEVE_SIMULATION_ERROR,
          //});
        });
}
