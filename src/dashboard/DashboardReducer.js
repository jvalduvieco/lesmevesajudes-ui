import {SexType, FilterType, YesNoType} from './DashboardTypes';

export const SHOW_DASHBOARD_CHARTS = 'SHOW_DASHBOARD_CHARTS';
export const SHOW_DASHBOARD_AIDS = 'SHOW_DASHBOARD_AIDS_TABLE';

export default function(
  state = {results:[],
          filter: FilterType,
          helpData: Object,
          sexData: SexType,
          schoolType: YesNoType,
          laboralData: Object,
          ageData: Object,
          housingData: Object,
          positiveNegativeData: Object,
        },
  action
) {
  switch (action.type) {
  case SHOW_DASHBOARD_AIDS:
      return {
        ...state,
        aids: action.aids,
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
      housingData: action.housingData,
      positiveNegativeData: action.positiveNegativeData,

    }
  default:
    return state;
  }

}
