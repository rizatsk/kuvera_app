import { getAccountGraphQl, updateProfileApi } from "@/service/account/api";
import { UpdateProfileApiResponse } from "@/service/account/type";
import { authAccountWithGoogle, logoutAuth } from "@/service/auth/api";
import { getRefreshToken, putAccessRefreshToken } from "@/service/auth/handle-token";
import {
    GoogleSignin,
    isSuccessResponse
} from '@react-native-google-signin/google-signin';
import { ActionReducer } from "../action";
import { setLoading } from "../visible-loading/action";
import { AsyncUpdateProfileUserParam, AuthUserType } from "./type";

export function setAuthUserActionCreator(user: AuthUserType) {
    return {
        type: ActionReducer.SET_AUTH,
        payload: {
            user: user,
        }
    }
};

export function unsetAuthUserActionCreator() {
    return {
        type: ActionReducer.UNSET_AUTH,
        payload: {
            user: null,
        },
    };
}

function updateProfileUserActionCreator({name, photo_profile_url}: UpdateProfileApiResponse) {
     return {
        type: ActionReducer.UPDATE_PROFILE_USER,
        payload: {
            user_update: {
                name,
                photo_profile_url
            },
        },
    };
}

export function asyncSignInWithGoogle() {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true))

            GoogleSignin.configure();
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                const tokenGoogle = await GoogleSignin.getTokens();

                // Login to service
                const {accessToken, refreshToken} = await authAccountWithGoogle(tokenGoogle.accessToken);
                console.log("Data accessToken and refreshToken", {
                    accessToken,
                    refreshToken
                })

                // Set to token in save local storage expo
                await putAccessRefreshToken(accessToken, refreshToken);

                // Get data account
                const user = await getAccountGraphQl();

                dispatch(setAuthUserActionCreator(user))
            } else {
                console.log("Google sign in cancel by user")
            }
        } catch (error) {
            console.log("Error sign in with google", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export function asyncUnsetAuth() {
    return async (dispatch: any) => {
        dispatch(setLoading(true))
        try {
            // Logout google
            GoogleSignin.configure();
            await GoogleSignin.signOut().catch((error) => console.log('Fail google signin to logout', error));

            // Logout to service
            const refreshToken = await getRefreshToken();
            await logoutAuth(refreshToken);

            // Delete token in save local storage expo
            await putAccessRefreshToken('', '')

            dispatch(unsetAuthUserActionCreator())
        } catch (error) {
            console.log("Error unset auth", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export function asyncUpdateProfileUser({
    param, successHandler
}: AsyncUpdateProfileUserParam) {
    return async (dispatch: any) => {
        dispatch(setLoading(true))
        try {
            const payload: Record<string, any> = {};
            if (param.name) payload.name = param.name;
            if (param.photo_profile) payload.photo_profile = param.photo_profile;

            const result = await updateProfileApi(payload);

            dispatch(updateProfileUserActionCreator({
                name: result.name,
                photo_profile_url: result.photo_profile_url
            }));
            successHandler();
        } catch (error) {
            console.log("Error asyncUpdateProfileUser", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}