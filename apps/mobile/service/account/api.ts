import environment from "@/constants/environment";
import axios from "axios";
import { getAccessToken } from "../auth/handle-token";
import { GetAccountGraphQlResponse, UpdateProfileApiParam, UpdateProfileApiResponse } from "./type";

export async function getAccountGraphQl(): Promise<GetAccountGraphQlResponse> {
    const accessToken = await getAccessToken();
    try {
        const { data: result } = await axios({
            method: 'POST',
            url: environment.BASE_URL + '/graphql',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            data: JSON.stringify({
                query: `query { account { name email photo_profile_url created_dt updated_dt } }`,
                variables: {}
            })
        });

        return result.data.account;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.errors[0]?.message,
            code: response?.errors[0]?.statusCode,
        };
    }
}

export async function updateProfileApi({ name, photo_profile }: UpdateProfileApiParam): Promise<UpdateProfileApiResponse> {
    const accessToken = await getAccessToken();
    try {
        const formData = new FormData();
        if (name) formData.append("name", name as string)
        if (photo_profile) formData.append("photo_profile", {
            uri: photo_profile.uri,
            name: photo_profile.name,
            type: photo_profile.type,
        } as unknown as Blob);

        const { data: result } = await axios({
            method: 'PATCH',
            url: environment.BASE_API_URL + '/account/user',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + accessToken
            },
            data: formData
        });

        return result.data;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.errors[0]?.message,
            code: response?.errors[0]?.statusCode,
        };
    }
}
