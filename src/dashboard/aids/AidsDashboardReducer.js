import {AidsFilterType} from './AidsDashboardTypes';

export const AIDS_DASHBOARD_FILTER = 'AIDS_DASHBOARD_FILTER';

export default function(
  state = {
    filter: AidsFilterType
  },
  action
) {
  switch (action.type) {
    case 'AIDS_DASHBOARD_FILTER':
      return {
        ...state,
        filter : action.filter,
    }
  default:
    return state;
  }
}
