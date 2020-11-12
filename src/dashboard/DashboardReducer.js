import {SexType, FilterType, YesNoType} from './DashboardTypes';

export const SHOW_DASHBOARD_CHARTS = 'SHOW_DASHBOARD_CHARTS';
export const SHOW_DASHBOARD_AIDS = 'SHOW_DASHBOARD_AIDS_TABLE';
export const SHOW_DASHBOARD_EDITED_COUNT = 'SHOW_DASHBOARD_EDITED_COUNT';
export const SHOW_DASHBOARD_SIMULATIONS = 'SHOW_DASHBOARD_SIMULATIONS';

export default function(
  state = {
          results:[],
          aids: [],
          filter: FilterType,
          totalSimulationsByYearData: Object,
          recalculatedSimulationsByYearData: Object,
          helpData: Object,
          sexData: SexType,
          schoolType: YesNoType,
          laboralData: Object,
          ageData: Object,
          housingData: Object,
          positiveNegativeData: Object,
          filtersVisible: false
        },
  action
) {
  switch (action.type) {
  case SHOW_DASHBOARD_AIDS:
      return {
        ...state,
        aids: action.aids,
  }
  case SHOW_DASHBOARD_SIMULATIONS:
    return {
      ...state,
      results: action.results,
      positiveNegativeData: action.positiveNegativeData,
      totalSimulationsByMonthData: action.totalSimulationsByMonthData,
      recalculatedSimulationsByMonthData: action.recalculatedSimulationsByMonthData,
      simulationsByPersonsData: action.simulationsByPersonsData,
  }
  case SHOW_DASHBOARD_CHARTS:
    return {
      ...state,
      results: action.results,
      sexData: action.sexData,
      schoolData: action.schoolData,
      violenceData: action.violenceData,
      disabledData: action.disabledData,
      helpData: action.helpData,
      laboralData: action.laboralData,
      ageData: action.ageData,
      aidData: action.aidData,
      housingData: action.housingData,
      positiveNegativeData: action.positiveNegativeData,
  }
  case SHOW_DASHBOARD_EDITED_COUNT:
    return {
      ...state,
      editedCount: action.editedCount,
    }
  default:
    return state;
  }
}
