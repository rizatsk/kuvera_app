import { ActionReducerType } from "../action";

export type ActionHomeRefreshType = {
  type: ActionReducerType;
  payload: {
    refresh: boolean;
  };
}