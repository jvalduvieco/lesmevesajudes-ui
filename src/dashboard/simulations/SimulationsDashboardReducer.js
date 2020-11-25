
export const SIMULATIONS_DASHBOARD_FILTER = 'SIMULATIONS_DASHBOARD_FILTER';

const initialUntilDate = new Date()
const initialFromDate = new Date(initialUntilDate.getFullYear() + "-01-01")


export default function(
  state = {
    fromDate: initialFromDate,
    untilDate: initialUntilDate,
  },
  action
) {
  switch (action.type) {
    case SIMULATIONS_DASHBOARD_FILTER:
      return {
        ...state,
        fromDate : action.fromDate,
        untilDate: action.untilDate
    }
  default:
    return state;
  }
}
