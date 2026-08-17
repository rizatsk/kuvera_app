import { getAccountGraphQl } from "@/service/account/api";
import { ActionReducer } from "../action";
import { setAuthUserActionCreator } from "../auth-user/action";
import { setLoading } from "../visible-loading/action";

export function setPreloadAction(preload: boolean) {
    return {
        type: ActionReducer.SET_PRELOAD,
        payload: {
            preload
        }
    }
}

export function asyncPreloadProcess() {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true))
            dispatch(setPreloadAction(true));

            // Get data account
            const user = await getAccountGraphQl();
            dispatch(setAuthUserActionCreator(user))
        } catch (error) {
            console.log("Error async preload process", error)
        } finally {
            dispatch(setPreloadAction(false))
            dispatch(setLoading(false))
        }
    }
}
