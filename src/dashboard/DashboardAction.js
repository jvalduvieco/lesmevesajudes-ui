import axios from 'axios/index';
import {DASHBOARD_URL, SIMULATION_STORE_AUTH_TOKEN} from '../config';
import {SHOW_DASHBOARD} from './DashboardReducer';
import {FilterType} from './DashboardTypes';
import {
    compose,
    countBy,
    equals,
    filter,
    flatten,
    forEach,
    map,
    pluck,
    prop,
    values } from 'ramda';

export const RETRIEVE_DASHBOARD_ERROR = 'RETRIEVE_DASHBOARD_ERROR';
export const TIMED_OUT_DASHBOARD = 'TIMED_OUT_DASHBOARD';

const esMenor = persona => prop('edat')(persona) < 18; //TODO is this the condition for an adult person?

const collectHelpData = (results: List, filter: FilterType) => {
  return compose(
          countBy(forEach(v => v)),
          flatten,
          map(prop('ajudes')),
          flatten,
          map(prop('persones')))(results)
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

export const retrieveDashboard = () => async dispatch =>   {
  axios.get(DASHBOARD_URL, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}}).then(response => {
  		if (response.status === 210) {
  			return dispatch({
  				type: RETRIEVE_DASHBOARD_ERROR,
  	      payload: TIMED_OUT_DASHBOARD,
  			});
  		}

  		return dispatch ({
        type: SHOW_DASHBOARD,
        results: response.data.dashboards,
        sexData: collectSexData(response.data.dashboards),
        schoolData: collectSchoolData(response.data.dashboards),
        violenceData: collectViolenceData(response.data.dashboards),
        disabledData: collectDisabledData(response.data.dashboards),
        helpData: collectHelpData(response.data.dashboards)
  		});

  	}).catch(error => {
      console.log(JSON.stringify(error, null, 2));
      //dispatch({
      //  type: RETRIEVE_SIMULATION_ERROR,
      //  payload: RETRIEVE_SIMULATION_ERROR,
      //});
    });
}
