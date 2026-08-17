import environment from "@/constants/environment";
import axios from "axios";

export type AuthAccountWithGoogleResponse = {
    accessToken: string
    refreshToken: string
}

export async function authAccountWithGoogle(accessToken: string): Promise<AuthAccountWithGoogleResponse> {
    try {
        const { data: result } = await axios({
            method: 'POST',
            url: environment.BASE_API_URL + "/auth/google",
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        return result.data;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
};

export async function refreshToken(refreshToken: string): Promise<AuthAccountWithGoogleResponse> {
    const { data: result } = await axios({
        method: 'PATCH',
        url: environment.BASE_API_URL + "/auth/refresh-token",
        headers: {
            Authorization: 'Bearer ' + refreshToken
        }
    });

    return result.data;
}

export async function logoutAuth(refreshToken: string) {
    await axios({
        method: 'DELETE',
        url: environment.BASE_API_URL + "/auth/logout",
        headers: {
            Authorization: 'Bearer ' + refreshToken
        }
    });
}