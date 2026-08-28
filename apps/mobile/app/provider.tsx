import { store } from "@/states";
import { asyncPreloadProcess } from "@/states/is-login/action";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        // Dispatch preload process setelah Redux context tersedia
        store.dispatch(asyncPreloadProcess() as any);
        GoogleSignin.configure();
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
