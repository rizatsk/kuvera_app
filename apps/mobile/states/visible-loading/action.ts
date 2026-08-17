import { ActionReducer } from "../action";

export function setLoading(isLoading: boolean) {
    return {
        type: ActionReducer.SET_LOADING,
        payload: {
            isLoading
        }
    } 
}