import { ActionReducer } from "./action";
import { AuthUserType } from "./auth-user/type";

export function setIsLoginAction(isLogin: boolean) {
    return {
        type: ActionReducer.SET_IS_LOGIN,
        payload: {
            isLogin
        }
    }
}

export function setAuthUserActionCreator(user: AuthUserType) {
    return {
        type: ActionReducer.SET_AUTH,
        payload: {
            user: user,
        }
    }
};
