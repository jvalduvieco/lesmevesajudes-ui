import {SexType, FilterType, YesNoType} from './DashboardTypes';

export const SHOW_DASHBOARD = 'SHOW_DASHBOARD';

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
  case SHOW_DASHBOARD:
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
