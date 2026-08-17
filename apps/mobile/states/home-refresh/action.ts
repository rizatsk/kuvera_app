import { ActionReducer } from "../action";

function setHomeRefresh(refresh: Boolean) {
    return {
        type: ActionReducer.SET_HOME_REFRESH,
        payload: {
            refresh: refresh
        }
    }
};

export function actionHomeRefresh() {
    return async (dispatch: any) => {
        dispatch(setHomeRefresh(true))
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        dispatch(setHomeRefresh(false))

    }
}

