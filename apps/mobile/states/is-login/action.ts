import { getAccountGraphQl } from "@/service/account/api";
import { ActionReducer } from "../action";
import { setAuthUserActionCreator } from "../auth-user/action";
import { setLoading } from "../visible-loading/action";

export function setIsLoginAction(isLogin: boolean) {
    return {
        type: ActionReducer.SET_IS_LOGIN,
        payload: {
            isLogin
        }
    }
}

export function asyncPreloadProcess() {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true))
            
            // Get data account
            const user = await getAccountGraphQl();
            dispatch(setIsLoginAction(true));
            dispatch(setAuthUserActionCreator(user))
        } catch (error) {
            console.log("Error async preload process", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}
