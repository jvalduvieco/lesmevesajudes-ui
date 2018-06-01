// @flow
import type {StepsActions} from "./StepsActions";
import type {StepsState} from "./StepsTypes";


const initial: StepsState = {
  current_step: 0,
  button_enabled: false,
  button_visible: false
};

export default (state: StepsState = initial, action: StepsActions): StepsState => {
  switch (action.type) {
    case "NEXT_STEP": {
      return {
        ...state,
        current_step: state.current_step + 1,
      };
    }
    case "BACK_STEP":
      return {
        ...state,
        current_step: state.current_step - 1,
      };
    case "BUTTONS_VISIBLE":
      return {
        ...state,
        button_visible: true
      };
    case "BUTTONS_DISABLED":
      return {
        ...state,
        button_enabled: false
      };
    case "BUTTONS_ENABLED":
      return {
        ...state,
        button_enabled: true
      };
    case "BUTTONS_HIDDEN":
      return {
        ...state,
        button_visible: false
      };
    default:
      return state;
  }
};
