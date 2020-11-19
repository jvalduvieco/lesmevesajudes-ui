// @flow
import type {FamilyDataActions} from './FamilyDataActions';
import type {FamilyData} from './FamilyDataTypes';

type FamilyDataState = FamilyData | {};
const init = () => ({custodies: {}, parelles: {}});

export default function (
    state: FamilyDataState = init(),
    action: FamilyDataActions
): FamilyDataState {
  switch (action.type) {
    case 'ADD_FAMILY_DATA':
      return action.familyData;
    case 'ADD_PERSON':
    case 'UPDATE_PERSON':
    case 'REMOVE_PERSON':
      return init();
    case 'SHOW_SIMULATION':
    	return action.simulation.family ? action.simulation.family : null;
    default:
      return state;
  }
}
