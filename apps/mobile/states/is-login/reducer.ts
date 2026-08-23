import { ActionReducer, ActionReducerType } from "../action";

interface Action {
  type: ActionReducerType;
  payload: {
    isLogin: boolean;
  };
}

function isLoginReducer(initial = false, action = {} as Action) {
  switch (action.type) {
    case ActionReducer.SET_IS_LOGIN:
      return action.payload.isLogin;
    default:
      return initial;
  }
}

export default isLoginReducer;
