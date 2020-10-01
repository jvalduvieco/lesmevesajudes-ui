export const SHOW_ALL_SIMULATIONS = 'SHOW_ALL_SIMULATIONS';

export default function(
  state = {simulations:[]},
  action
) {
  switch (action.type) {
  case SHOW_ALL_SIMULATIONS:
    return {
      ...state,
      simulations: action.simulations,
    }
  default:
    return state;
  }

}
