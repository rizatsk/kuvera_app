import { ActionReducer } from "../action";
import { ActionAuthUserReducer, AuthUserType } from "./type";

function authUserReducer(
  initial = null as AuthUserType | null,
  action = {} as ActionAuthUserReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_AUTH:
      return action.payload.user;
    case ActionReducer.UPDATE_PROFILE_USER:
      let user_update_profile = { ...initial }
      if (action.payload.user_update.name) user_update_profile.name = action.payload.user_update.name;
      if (action.payload.user_update.photo_profile_url) user_update_profile.photo_profile_url = action.payload.user_update.photo_profile_url;
      return user_update_profile;
    case ActionReducer.UNSET_AUTH:
      return null;
    default:
      return initial;
  }
}

export default authUserReducer;