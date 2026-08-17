import { ActionReducer } from "../action";
import { ActionHomeRefreshType } from "./type";

function homeRefreshReducer(
  initial = false,
  action = {} as ActionHomeRefreshType,
) {
  switch (action.type) {
    case ActionReducer.SET_HOME_REFRESH:
      return action.payload.refresh;
    default:
      return initial;
  }
}

export default homeRefreshReducer;