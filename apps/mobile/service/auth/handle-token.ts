import { getItem, setItem } from "@/helper/secure-store";
import { refreshToken as refreshTokenApi } from "./api";

export async function getAccessToken(): Promise<string> {
    const accessToken = await getItem("oat"),
        expiredAccessToken = await getItem("oat_to");

    // Validate token is expired
    if (expiredAccessToken) {
        const timeNow = new Date();
        const timeExpired = new Date(expiredAccessToken);

        if (timeNow >= timeExpired) {
            // Generate new access token
            const refreshToken = await getRefreshToken()
            const newToken = await refreshTokenApi(refreshToken as string);
            await putAccessRefreshToken(newToken.accessToken, newToken.refreshToken)

            return newToken.accessToken;
        };
    } else if (!accessToken || !expiredAccessToken) {
        // When is not authenticated
        await putAccessRefreshToken('', '');
        throw {
            status: 401,
            message: 'Sesi Anda telah berakhir, silahkan masuk kembali'
        };
    };

    return accessToken as string;
}

export async function getRefreshToken(): Promise<string> {
    const refreshToken = await getItem("oat_rf"),
        expiredRefreshToken = await getItem("oat_rf_to");

    // Validate token is expired
    if (expiredRefreshToken) {
        const timeNow = new Date();
        const timeExpired = new Date(expiredRefreshToken);

        if (timeNow >= timeExpired) {
            await putAccessRefreshToken('', '');
            throw {
                status: 401,
                message: 'Sesi Anda telah berakhir, silahkan masuk kembali'
            };
        };
    };

    return refreshToken as string;
}

export async function putAccessRefreshToken(accessToken: string, refreshToken: string) {
    const timeNow = new Date();
    const expiredTimeAccessToken = new Date(
        timeNow.getTime() + (60 * 60 * 1000) - (30 * 1000),
    ).toISOString();

    await setItem("oat", accessToken);
    await setItem("oat_to", accessToken ? expiredTimeAccessToken : '');

    const expiredTimeRefreshToken = new Date(
        timeNow.getTime() + (7 * 24 * 60 * 60 * 1000) - (5 * 1000),
    ).toISOString();

    await setItem("oat_rf", refreshToken);
    await setItem("oat_rf_to", refreshToken ? expiredTimeRefreshToken : '');
}