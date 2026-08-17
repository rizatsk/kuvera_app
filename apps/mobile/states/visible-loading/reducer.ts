import { ActionReducer, ActionReducerType } from "../action";


interface Action {
  type: ActionReducerType;
  payload: {
    isLoading: boolean;
  };
}

function isLoadingReducer(initial = false, action = {} as Action) {
  switch (action.type) {
    case ActionReducer.SET_LOADING:
      return action.payload.isLoading;
    default:
      return initial;
  }
}

export default isLoadingReducer;